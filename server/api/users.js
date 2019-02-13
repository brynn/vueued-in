const router = require('express').Router();
const { User, Item, Category, Location } = require('../db/models');
module.exports = router;

const sameUser = (req, res, next) => {
  if (req.user && Number(req.params.userId) === req.user.id) {
    next();
  } else {
    res.sendStatus(403);
  }
};

// users should only be able to access their own items and categories
const resourceBelongsToUser = resourceType => async (req, res, next) => {
  const userId = Number(req.params.userId);
  const resourceId = Number(req.params.resourceId);
  const resource =
    resourceType === 'item'
      ? await Item.findByPk(resourceId)
      : await Category.findByPk(resourceId);
  if (!resource) {
    // resource not found
    res.sendStatus(404);
  }
  if (resource.userId === userId) {
    req.resource = resource;
    next();
  } else {
    // forbidden
    res.sendStatus(403);
  }
};

//////////////////////////////
//// USER API ROUTES ////////
////////////////////////////

// GET a user: /api/users/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const user = await User.findByPk(userId, {
      attributes: ['id', 'firstName', 'lastName', 'email'],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//////////////////////////////
//// ITEM API ROUTES ////////
////////////////////////////

// GET a user's items: /api/users/:userId/items
// GET a user's items by category: /api/users/:userId/items?category=books

// TODO: am I using these anywhere on the frontend?
// GET a user's completed items: /api/users/:userId/items?completed=true
// GET a user's uncompleted items: /api/users/:userId/items?uncompleted=true
router.get('/:userId/items', sameUser, async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const categorySlug = req.query.category;
    const completed = req.query.completed;
    const uncompleted = req.query.uncompleted;

    // get all items for this user
    let items = await Item.findAll({
      where: { userId },
      include: [
        { model: Category, attributes: ['slug', 'isDefault', 'color', 'icon'] },
        { model: Location },
      ],
      order: [['isCompleted', 'DESC']],
    });

    // filter by category
    if (categorySlug) {
      const categoryId = await Category.getCategoryIdFromSlug(
        categorySlug,
        userId
      );
      items = items.filter(item => item.categoryId === categoryId);
    }

    // filter by completed
    if (completed) {
      items = items.filter(item => item.isCompleted);
    }

    // filter by uncompleted
    if (uncompleted) {
      items = items.filter(item => !item.isCompleted);
    }
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// POST a new item: /api/users/:userId/items
router.post('/:userId/items', sameUser, async (req, res, next) => {
  try {
    const name = req.body.name;
    const categoryId = Number(req.body.categoryId);
    const userId = Number(req.params.userId);
    const locationId = Number(req.body.locationId);
    const link = req.body.link;
    const notes = req.body.notes;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const expirationDate = req.body.expirationDate;

    const newItem = await Item.create({
      name,
      categoryId,
      userId,
      locationId,
      link,
      notes,
      description,
      imageUrl,
      expirationDate,
    });
    const newItemWithCategory = await Item.findOne({
      where: { id: newItem.id },
      // need to include item category info in response for the frontend
      include: [
        { model: Category, attributes: ['slug', 'isDefault', 'color', 'icon'] },
      ],
    });
    res.json(newItemWithCategory);
  } catch (err) {
    next(err);
  }
});

// GET a user's item: /api/users/:userId/items/:itemId
router.get(
  '/:userId/items/:resourceId',
  sameUser,
  resourceBelongsToUser('item'),
  async (req, res, next) => {
    try {
      res.json(req.resource);
    } catch (err) {
      next(err);
    }
  }
);

// PUT (check) a user's item: /api/users/:userId/items/:itemId?checking=true
router.put(
  '/:userId/items/:resourceId',
  sameUser,
  resourceBelongsToUser('item'),
  async (req, res, next) => {
    // true or false boolean value
    const checking = JSON.parse(req.query.checking);
    if (checking) {
      try {
        await req.resource.checkItem();
        const item = await Item.findOne({
          where: { id: req.params.resourceId },
          // need to include item category info in response for the frontend
          include: [
            {
              model: Category,
              attributes: ['slug', 'isDefault', 'color', 'icon'],
            },
          ],
        });
        res.json(item);
      } catch (err) {
        next(err);
      }
    }
  }
);

// DELETE a user's item: /api/users/:userId/items/:itemId
router.delete(
  '/:userId/items/:resourceId',
  sameUser,
  resourceBelongsToUser('item'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.resourceId);
      await Item.destroy({ where: { id } });
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  }
);

//////////////////////////////
//// CATEGORY API ROUTES ////
////////////////////////////

// GET a user's categories: /api/users/:userId/categories
// eager load items so that we have acccess to categories.items.length
// GET a user's category given a slug: /api/users/:userId/categories?slug=books
router.get('/:userId/categories', sameUser, async (req, res, next) => {
  try {
    let categories = await Category.findAll({
      where: { userId: req.params.userId },
      include: [{ model: Item, attributes: ['id'] }],
      order: ['id'],
    });
    // TODO: is this api route necessary?
    const categorySlug = req.query.slug;
    if (categorySlug) {
      categories = categories.filter(
        category => category.slug === categorySlug
      );
    }
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

// POST a new category: /api/users/:userId/categories
router.post('/:userId/categories', sameUser, async (req, res, next) => {
  try {
    const name = req.body.name;
    const userId = Number(req.params.userId);
    const isPlace = req.body.isPlace;

    // generate category slug from name
    const slug = Category.generateSlug(name);

    // make sure we're adding a unique category (for this user)
    const existingId = await Category.getCategoryIdFromSlug(slug, userId);
    if (existingId) {
      res.send('Category already exists');
    } else {
      const newCategory = await Category.create({
        name,
        slug,
        userId,
        isPlace,
        isDefault: false,
      });
      res.json(newCategory);
    }
  } catch (err) {
    next(err);
  }
});

// GET a user's category: /api/users/:userId/categories/:categoryId
router.get(
  '/:userId/categories/:resourceId',
  sameUser,
  resourceBelongsToUser('category'),
  async (req, res, next) => {
    try {
      res.json(req.resource);
    } catch (err) {
      next(err);
    }
  }
);

// DELETE a user's category: /api/users/:userId/categories/:categoryId
router.delete(
  '/:userId/categories/:resourceId',
  sameUser,
  resourceBelongsToUser('category'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.resourceId);
      await Category.destroy({ where: { id } });
      res.status(204).json();
    } catch (err) {
      next(err);
    }
  }
);

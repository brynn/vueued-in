const User = require('./user');
const Item = require('./item');
const Category = require('./category');
const Location = require('./location');

/**
 * Associations
 */
Item.belongsTo(User);
User.hasMany(Item);
Item.belongsTo(Category);
Category.hasMany(Item);
Category.belongsTo(User);
User.hasMany(Category);
Location.hasOne(Item);

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Item,
  Category,
  Location,
};

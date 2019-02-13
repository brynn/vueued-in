const Sequelize = require('sequelize');
const db = require('../db');
const Category = require('./category');

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  link: {
    type: Sequelize.STRING,
    validate: { isUrl: { msg: 'Invalid URL provided for the item link' } },
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: { isUrl: { msg: 'Invalid URL provided for the item image' } },
  },
  notes: {
    type: Sequelize.TEXT,
  },
  description: {
    type: Sequelize.TEXT,
  },
  isCompleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isPublic: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  // optional field for the "expiration" of this item
  expirationDate: {
    type: Sequelize.DATE,
  },
  completedDate: {
    type: Sequelize.DATE,
  },
});

/**
 * instanceMethods
 */
Item.prototype.checkItem = async function() {
  // if we're completing, set completion date to now
  this.completedDate = !this.isCompleted ? new Date() : null;
  this.isCompleted = !this.isCompleted;
  await this.save();
};

Item.prototype.getCategoryInfo = async function() {
  const category = await Category.findByPk(this.categoryId);
  return {
    slug: category.slug,
    isDefault: category.isDefault,
    color: category.color,
  };
};

Item.prototype.generatePreview = function() {
  if (this.link) {
    // TODO: parse link for image and description
    // this.imageUrl = image
    // this.description = description
  }
};

module.exports = Item;

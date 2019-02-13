const Sequelize = require('sequelize');
const db = require('../db');

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isDefault: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  color: {
    type: Sequelize.ENUM,
    values: [
      '#519839',
      '#d9b51c',
      '#cd8313',
      '#0079bf',
      '#89609e',
      '#eb5a46',
      '#97a7b0',
    ],
    defaultValue: '#97a7b0',
  },
  isPlace: {
    type: Sequelize.ENUM,
    values: ['always', 'sometimes', 'never'],
    defaultValue: 'never',
  },
  isPublic: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  icon: {
    type: Sequelize.STRING,
    defaultValue: 'list',
  },
});

/**
 * classMethods
 */
Category.generateSlug = name => {
  return name
    .replace(/\s/g, '_')
    .replace(/\W/g, '')
    .toLowerCase();
};

Category.getCategoryIdFromSlug = async function(slug, userId) {
  const category = await Category.findOne({ where: { slug, userId } });
  return category ? category.id : null;
};

module.exports = Category;

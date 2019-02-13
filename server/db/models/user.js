const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');
const Category = require('./category');

const User = db.define(
  'user',
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      // Making `.password` act like a func hides it when serializing to JSON.
      // This is a hack to get around Sequelize's lack of a "private" option.
      get() {
        return () => this.getDataValue('password');
      },
    },
    salt: {
      type: Sequelize.STRING,
      // Making `.salt` act like a function hides it when serializing to JSON.
      // This is a hack to get around Sequelize's lack of a "private" option.
      get() {
        return () => this.getDataValue('salt');
      },
    },
    imageUrl: {
      type: Sequelize.STRING,
      validate: { isUrl: { msg: 'Invalid URL provided for the user image' } },
    },
    googleId: {
      type: Sequelize.STRING,
    },
    birthday: {
      type: Sequelize.DATE,
    },
  },
  {
    getterMethods: {
      fullName() {
        return this.firstName + ' ' + this.lastName;
      },
    },
  }
);

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

const generateDefaultCategories = async userId => {
  await Category.create({
    userId,
    name: 'Books',
    slug: 'books',
    color: '#519839',
    icon: 'library_books',
  });
  await Category.create({
    userId,
    name: 'Movies',
    slug: 'movies',
    color: '#d9b51c',
    icon: 'movie',
  });
  await Category.create({
    userId,
    name: 'TV Shows',
    slug: 'tv_shows',
    color: '#cd8313',
    icon: 'live_tv',
  });
  await Category.create({
    userId,
    name: 'Music',
    slug: 'music',
    color: '#0079bf',
    icon: 'headset',
  });
  await Category.create({
    userId,
    name: 'Bars & Restaurants',
    slug: 'bars_restaurants',
    color: '#89609e',
    isPlace: 'always',
    icon: 'restaurant',
  });
  Category.create({
    userId,
    name: 'Art',
    slug: 'art',
    color: '#eb5a46',
    isPlace: 'sometimes',
    icon: 'brush',
  });
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.afterCreate(async user => {
  await generateDefaultCategories(user.id);
});

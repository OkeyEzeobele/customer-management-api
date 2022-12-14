const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const env = process.env.NODE_ENV || 'production';

const basename = path.basename(module.filename);
const config = require('./config.js')[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

console.log(config);

const db = {};

fs
  .readdirSync(path.join(__dirname, 'models'))
  .filter(
    file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, 'models', file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

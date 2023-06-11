const dbConfig = require("../config.js/db.Config");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operationsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const users = require("../models/userModel")(sequelize, DataTypes)
const Products = require("../models/productModel")(sequelize, DataTypes)
const productCarts = require("../models/productCartModel")(sequelize, DataTypes)
const userAddress = require("../models/addressModel")(sequelize, DataTypes)
const orders = require("../models/orderModel")(sequelize, DataTypes)

users.hasMany(orders, { foreignKey: 'userId' })
Products.hasMany(orders, { foreignKey: 'productId' })
userAddress.hasMany(orders, { foreignKey: 'userAddressId' })

orders.belongsTo(users, { foreignKey: 'userId' })
orders.belongsTo(Products, { foreignKey: 'productId' })
orders.belongsTo(userAddress, { foreignKey: 'userAddressId' })



users.hasMany(Products, { foreignKey: 'createdBy' })
Products.belongsTo(users, { foreignKey: 'createdBy' })

users.hasMany(productCarts, { foreignKey: 'userId' })
Products.hasMany(productCarts, { foreignKey: 'productId' })

productCarts.belongsTo(users, { foreignKey: 'userId' })
productCarts.belongsTo(Products, { foreignKey: 'productId' })

users.hasMany(userAddress, { foreignKey: 'userId' })
userAddress.belongsTo(users, { foreignKey: 'userId' })

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = users
db.Products = Products
db.productCarts = productCarts
db.userAddress = userAddress
db.orders = orders


module.exports = db

db.sequelize.sync({ force: false }).then(() => {

    console.log("dy _synced.");

});


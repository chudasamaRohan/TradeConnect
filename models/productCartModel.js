const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const productCarts = sequelize.define('productCarts', {
        productId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        }
    })
    return productCarts
}
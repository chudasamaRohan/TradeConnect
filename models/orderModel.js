
module.exports = (sequelize, DataTypes) => {
    const orders = sequelize.define('orders', {
        userId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        productId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        userAddressId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        orderDate: {
            type: DataTypes.DATE
        },
        delivaryDate: {
            type: DataTypes.DATE
        },
        shippingcharge: {
            type: DataTypes.FLOAT
        },
        totalPayment: {
            type: DataTypes.FLOAT
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
    return orders
}
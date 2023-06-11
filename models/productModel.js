module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define('Products', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sold: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        images: {
            type: DataTypes.JSON,
            allowNull: true
        },
        color: {
            type: DataTypes.JSON,
            defaultValue: [],
        },
        deliverPlace: {
            type: DataTypes.STRING,
        },
        shippingCharge: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        totalrating: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        createdBy: {
            type: DataTypes.INTEGER,
            foreignKey: true
        }
    }, {
        timestamps: true
    });
    return Products;
};

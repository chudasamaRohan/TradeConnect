
module.exports = (sequelize, DataTypes) => {
    const userAddress = sequelize.define('userAdress', {
        address: {
            type: DataTypes.STRING,
        },
        userId: {
            type: DataTypes.INTEGER,
            foreignKey: true
        }
    })
    return userAddress
}
const bcrypt = require("bcrypt")

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        mobileNo: {
            type: DataTypes.BIGINT
        },
        password: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.ENUM,
            values: ['user', 'staff', 'admin'],
            defaultValue: 'user'
        },
        isBlocked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    })
    users.beforeCreate(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
    });
    users.beforeUpdate(async (user) => {
        if (user.changed('password')) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
        }
    });
    users.prototype.comparePassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };
    return users
}
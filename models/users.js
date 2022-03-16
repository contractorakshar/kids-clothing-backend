module.exports = function (sequelize, DataTypes) {
    return sequelize.define('users', {
        email: {
            type: DataTypes.STRING(100),
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        country: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        mobile_no: {
            type: DataTypes.STRING(13),
            allowNull: false
        },
        profile_picture: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        user_type: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: '0'
        },
        is_deleted: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: '0'
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('current_timestamp')
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('current_timestamp')
        },

    }, {
        tableName: 'users'
    });
}

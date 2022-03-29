
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('products', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        category_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        manufacturer: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        color: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false
        },
        cover_image: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false
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
        tableName: 'products'
    });
}

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('productPhotos', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        photo_url: {
            type: DataTypes.STRING(255),
            allowNull: false,
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
        tableName: 'productPhotos'
    });
}
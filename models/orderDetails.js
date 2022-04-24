
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('orderDetails', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        order_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        total_price: {
            type: DataTypes.INTEGER(11),
            allowNull: false
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
        tableName: 'orderDetails'
    });
}
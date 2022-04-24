
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('bill', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        email_id: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        order_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        payment_method: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        remark: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
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
        tableName: 'bill'
    });
}
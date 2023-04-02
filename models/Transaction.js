const { DataTypes } = require("sequelize");

const Transaction = (sequelize) => {
  return sequelize.define('Transaction', {
    trx_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    trx_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });
};

module.exports = Transaction;
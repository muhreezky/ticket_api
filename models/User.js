const { DataTypes } = require("sequelize");

const User = (sequelize) => {
  return sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_num: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    suspended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    pass_attempts: {
      type: DataTypes.INTEGER,
      length: 1,
      defaultValue: 0
    }
  });
};

module.exports = User;
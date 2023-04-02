const { DataTypes } = require("sequelize");

// Model data Kehadiran peserta event
const Attendance = (sequelize) => {
  return sequelize.define("Attendance", {
    attend_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    event_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
}

module.exports = Attendance;
const { verifyToken, checkPrivilege } = require("../middleware/auth");
const db = require("../models");
const { Event, Transaction } = db;

const EventController = {
  createNew: async (req, res) => {
    try {
      const { event_name, event_date, price, quota, location } = req.body;
      
      Event.create({
        event_name,
        event_date,
        price,
        quota,
        admin_id: req.user.id,
        location
      });

      return res.status(201).json({
        message: "Event successfully added"
      });

    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        message: error.message
      });
    }
  },
};

module.exports = EventController;
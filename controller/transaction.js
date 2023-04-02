const db = require("../models");
const { Transaction, Event } = db;

const TransactionController = {
  buyTicket: async (req, res) => {
    try {
      const { event_id, amount } = req.body;
      const user_id = req.user.id;
      const checkEvent = await Event.findOne({
        where: {
          event_id
        }
      });
      console.log(checkEvent);
      
      if (!checkEvent) {
        return res.status(404).json({
          message: "Event not found"
        });
      }

      await Event.update(
        {
          quota: checkEvent.quota - amount
        }
      );

      await Transaction.create({
        user_id,
        total_price,
        amount
      });

    } catch (err) {
      return res.status(500).json({
        message: err.message
      })
    }
  }
}

module.exports = TransactionController;
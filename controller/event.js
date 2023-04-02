const { verifyToken, checkPrivilege } = require("../middleware/auth");
const db = require("../models");
const { Event, Attendance } = db;

const EventController = {
  createNew: async (req, res) => {
    try {
      const { event_name, event_date, price, quota, location } = req.body;

      // Membuat event baru
      Event.create({
        event_name,
        event_date,
        price,
        quota,
        location,
        admin_id: req.user.user_id,
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
  
  getEvents: async (req, res) => {
    
    // Mengambil data event
    try {
      const page = Number(req.params.page)
      const limit = 5
      const offset = page <= 0 || !page ? 0 : (page - 1) * limit;
      const data = await Event.findAll({
        offset,
        limit
      });

      return res.status(200).json({
        message: "Fetch Success",
        data
      });
    } catch(err){
      return res.status(500).json({
        message: err.message
      })
    }
  },
  getUserAttendance: async (req, res) => {
    // Mengambil data kehadiran peserta event (hanya bisa dilakukan admin)
    try {
      const attendances = await Attendance.findAll();

      return res.status(200).json({
        attendances
      });
      
    } catch (error) {
      
    }
  }
};

module.exports = EventController;
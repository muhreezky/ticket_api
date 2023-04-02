const db = require("../models");
const { Transaction, Event, Attendance } = db;

const TransactionController = {
  buyTicket: async (req, res) => {
    try {
      // Mengambil data dari request body
      const { event_id, amount } = req.body;

      const user_id = req.user.user_id;

      // Mengambil data event
      const checkEvent = await Event.findOne({
        where: {
          event_id
        }
      });
      console.log(checkEvent);

      // Sesuai ketentuan di exercise, maka jumlah maksimum tiket yang dapat dipesan dalam satu kali transaksi adalah 3
      // Jika amount nya lebih dari 3, maka transaksi batal
      if (amount > 3) {
        return res.status(400).json({
          message: "Max amount is 3"
        })
      }
      
      // Jika event id tidak ditemukan, maka akan return message di bawah ini
      if (!checkEvent) {
        return res.status(404).json({
          message: "Event not found"
        });
      }

      // Mengurangi jumlah kuota peserta setelah tiket dibeli
      await Event.update(
        {
          quota: checkEvent.quota - amount
        },
        {
          where: {
            event_id
          }
        }
      );

      // Menambahkan ke daftar transaksi
      await Transaction.create({
        user_id,
        total_price: checkEvent.price * amount,
        amount
      });

      // Menambah user ke dalam daftar hadir event
      await Attendance.create({
        user_id,
        event_id,
        event_name: checkEvent.event_name
      })

      // Pesan transaksi sukses
      return res.status(200).json({
        message: "Transaction success"
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message
      })
    }
  },
  getHistory: async (req, res) => {
    try {
      // Mengambil user id
      const { user_id } = req.user;

      // Daftar transaksi dimasukkan ke variable const trxList
      const trxList = await Transaction.findAll({
        where: {
          user_id
        }
      });

      // trxList direturn dalam bentuk JSON
      return res.status(200).json({
        trxList
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  }
}

module.exports = TransactionController;
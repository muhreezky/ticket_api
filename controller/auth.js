const db = require("../models");
const { User } = db;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");

const AuthController = {
  register: async (req, res) => {
    try {
      const { username, email, password, confirm_pass, phone_num, isAdmin } = req.body;
      const isExists = await User.findOne({
        where: {
          [sequelize.Op.or]: [
            { username }, { email }, { phone_num }
          ]
        }
      });

      // Jika username, email, atau nomor telepon sudah terdaftar maka registrasi batal
      if (isExists) {
        return res.status(402).json({
          message: "Please use another username, email, and phone_num"
        });
      }

      // Jika password dengan confirm password tidak sama, maka gagal
      if (password !== confirm_pass) {
        return res.status(402).json({
          message: "Password not confirmed correctly"
        });
      }

      // Mentrigger ketika length password lebih kecil dari 8 karakter
      if (password.length < 8) {
        return res.status(400).json({
          message: "Minimum Length is 8"
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      await User.create({
        username, email, password: hashed, phone_num, isAdmin
      });

      return res.status(201).send({
        message: 'Register successful'
      });

    } catch (err) {
      return res.status(res.statusCode || 500).json({
        message: '500 Internal Server Error'
      });
    }
  },
  login: async (req, res) => {
    try {
      const { username = "", email = "", password, phone_num = "" } = req.body;
      const userCheck = await User.findOne({
        where: {
          [sequelize.Op.or]: [
            { username }, { email }, { phone_num }
          ]
        }
      });

      if (userCheck.suspended) {
        return res.status(403).json({
          message: "Sorry, your account is suspended"
        })
      }

      // Sudah berapa kali enter password salah
      const attempts = userCheck.pass_attempts;

      // apakah password benar atau salah
      const isValid = await bcrypt.compare(password, userCheck.password);

      if (!isValid) {
        if (attempts === 3) {
          await User.update(
            {
              suspended: true
            },
            {
              where: {
                user_id: userCheck.user_id
              }
            }
          );

          return res.status(403).json({
            message: "You reached maximum attempt, your account is now suspended"
          });
        }

        await User.update(
          {
            pass_attempts: attempts + 1
          },
          {
            where: {
              user_id: userCheck.user_id
            }
          }
        );
        return res.status(400).json({
          message: 'Wrong Credentials, please check again'
        });
      }

      const payload = { user_id: userCheck.user_id, isAdmin: userCheck.isAdmin };
      const token = jwt.sign(payload, 'ticket_app', { expiresIn: '2h' });

      return res.status(200).json({
        message: 'Login successful',
        token
      });

    } catch (err) {
      return res.status(res.statusCode || 500).json({
        message: err.message
      });
    }
  }
};

module.exports = AuthController;
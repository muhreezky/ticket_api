const routes = require("express").Router();
const { authController, eventController, transactionController } = require("../controller");
const { verifyToken, checkPrivilege } = require("../middleware/auth");

// Endpoint dengan method POST
routes.post('/register', authController.register);
routes.post('/login', authController.login);
routes.post('/events', verifyToken, checkPrivilege, eventController.createNew);
routes.post('/order', verifyToken, transactionController.buyTicket);

// Route dengan method GET
routes.get('/attendance', verifyToken, checkPrivilege, eventController.getUserAttendance);
routes.get('/events/:page', verifyToken, eventController.getEvents);
routes.get('/transactions', verifyToken, transactionController.getHistory);

module.exports = routes;
const routes = require("express").Router();
const { authController, eventController, transactionController } = require("../controller");
const { verifyToken, checkPrivilege } = require("../middleware/auth");

routes.post('/register', authController.register);
routes.post('/login', authController.login);
routes.post('/events', verifyToken, checkPrivilege, eventController.createNew);
// routes.post('/order', verifyToken, eventController.buyTicket);

module.exports = routes;
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) 
    return res.status(401).send("Unauthorized request");
  
  try {
    token = token.split(' ')[1];

    if (token === 'null' || !token) {
      return res.status(401).send("Unauthorized");
    }

    let verifiedUser = jwt.verify(token, 'ticket_app');
    console.log(verifiedUser);
    if (!verifiedUser) {
      return res.status(401).send("Unauthorized request");
    }

    req.user = verifiedUser;
    next();
  }
  catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
}

const checkPrivilege = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  }
  else {
    return res.status(401).send("Unauthorized");
  }
}

module.exports = {
  verifyToken,
  checkPrivilege
};
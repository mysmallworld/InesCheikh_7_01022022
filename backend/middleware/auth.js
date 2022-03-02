const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const result = dotenv.config();

//Authentification function
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    const userId = decodedToken.userId;
    //req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable !';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête non authentifiée !'),
      message: 'Requête non authentifiée !'
    });
  }
};
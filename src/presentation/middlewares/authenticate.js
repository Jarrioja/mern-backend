import jwt from 'jsonwebtoken';
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: 'Not Authenticated' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).send({ message: 'Authorization error' });
    }
    req.user = user.user;
    next();
  });
};

export default authenticate;

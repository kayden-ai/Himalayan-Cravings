import jwt from 'jsonwebtoken';

const checkToken = (req, res, next) => {
  const header = req.headers['authorization'];

  if (!header) {
    return res.sendStatus(401);
  }

  const token = header.split(' ')[1];

  jwt.verify(token, 'my_temporary_secret_key', (err, data) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = data;
    next();
  });
};

export {checkToken};

const allowedCors = [
  'https://sariolka.student.nomoredomains.xyz',
  'https://api.sariolka.students.nomoredomains.xyz',
  'http://sariolka.student.nomoredomains.xyz',
  'http://api.sariolka.students.nomoredomains.xyz',
  'localhost:3000',
  'http://localhost:3000',
  'https://localhost:3000',
<<<<<<< HEAD
  'https://localhost:3001',
  'http://localhost:3001',
  'localhost:3001',
  'https://api.sariola.diploma.nomoreparties.co',
  'http://api.sariola.diploma.nomoreparties.co',
  'https://sariola.diploma.nomoreparties.co',
  'http://sariola.diploma.nomoreparties.co',
=======
  'localhost:3001',
  'http://localhost:3001',
  'https://localhost:3001'
>>>>>>> 9685ea2656b2fb111f363d1dfbcf14501a96924d
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    res.end();
  }

  next();
};

module.exports = cors;

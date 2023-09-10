const allowedCors = [
  'https://sariolka.student.nomoredomains.xyz',
  'https://api.sariolka.students.nomoredomains.xyz',
  'http://sariolka.student.nomoredomains.xyz',
  'http://api.sariolka.students.nomoredomains.xyz',
  'localhost:3003',
  'http://localhost:3003',
  'https://localhost:3003',
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

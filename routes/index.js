const router = require('express').Router();
const { validationSignin, validationSignup } = require('../middlewares/validation');
const userRouter = require('./users');
const moviesRouter = require('./movies');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/error-not-found');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', validationSignup, createUser);
router.post('/signin', validationSignin, login);

router.use(auth);
router.use(userRouter);
router.use(moviesRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Такая страница не существует'));
});

module.exports = router;
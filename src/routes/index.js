const router = require('express').Router();
const { userRouter } = require('./users');
const { cardRouter } = require('./cards');
const { auth } = require('../middlewares/auth');
const { NotFoundError } = require('../errors');
const { login, createUser } = require('../controller/users');
const { validateUserBody, validateAuthentication } = require('../middlewares/validations');

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateAuthentication, login);

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Route doesnt exist'));
});

module.exports = router;

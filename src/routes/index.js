const router = require('express').Router();
const { userRoutes } = require('./users');
const { cardRoutes } = require('./cards');
const { auth } = require('../middlewares/auth');
const { NotFoundError } = require('../errors');
const { login, createUser } = require('../controller/users');
const { validateUserBody, validateAuthentication } = require('../middlewares/validations');

router.post('/sign-up', validateUserBody, createUser);
router.post('/sign-in', validateAuthentication, login);

router.use(auth);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use((req, res, next) => {
  next(new NotFoundError('Route doesnt exist'));
});

module.exports = router;

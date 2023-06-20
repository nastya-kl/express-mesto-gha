const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const NotFound = require('../errors/NotFound');
const { signInValidation, signUpValidation } = require('../utils/validation');

router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));

router.use('/signin', signInValidation, login);
router.use('/signup', signUpValidation, createUser);

router.use('/*', (req, res, next) => {
  next(new NotFound('Такой ссылки не существует'));
});

module.exports = router;

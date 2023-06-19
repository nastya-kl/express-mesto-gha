const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const NotFound = require('../errors/NotFound');

router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));

router.use('/signin', login);
router.use('/signup', createUser);

router.use('/*', (req, res, next) => {
  next(new NotFound('Такой ссылки не существует'));
});

module.exports = router;

const router = require('express').Router();
const {
  getUsers, getUserById, updateProfile, updateAvatar, getLoggedUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getLoggedUser);
router.get('/:id', getUserById);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

module.exports = router;

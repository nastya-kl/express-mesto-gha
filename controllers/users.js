const User = require('../modules/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

// const getUserById = (req, res) => {

// };

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(400).send({ message: `Произошла ошибка: ${err.message}` }));
};

// const updateProfile = (req, res) => {

// };

// const updateAvatar = (req, res) => {

// };

module.exports = {
  getUsers,
  // getUserById,
  createUser,
  // updateProfile,
  // updateAvatar,
};

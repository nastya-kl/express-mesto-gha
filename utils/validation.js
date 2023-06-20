const { celebrate, Joi } = require('celebrate');

const regex = /d/;

// Валидация:

// getUserById
const userIdValidation = celebrate({
  body: Joi.object().keys({
    userId: Joi.string().alphanum(),
  }),
});

// updateProfile
const userProfileInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

// updateAvatar
const userAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regex),
  }),
});

// login
const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

// createUser
const signUpValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().required().pattern(regex),
  }),
});

// deleteCard, likeCard, dislikeCard
const cardIdValidation = celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().alphanum(),
  }),
});

// createCard
const newCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(regex),
  }),
});

module.exports = {
  userIdValidation,
  userProfileInfoValidation,
  userAvatarValidation,
  cardIdValidation,
  newCardValidation,
  signInValidation,
  signUpValidation,
};

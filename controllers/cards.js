const Card = require('../modules/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

const createCard = (req, res) => {
  Card.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({
            message: 'Переданы некорректные данные при создании карточки',
          });
      } else {
        res
          .status(500)
          .send({
            message: `Произошла ошибка ${err.name}: ${err.message}`,
          });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => new Error('Not found'))
    .then((card) => res.send({ message: `Карточка ${card.name} удалена` }))
    .catch((err) => {
      // eslint-disable-next-line no-constant-condition
      if (err.message === 'Not found' || 'CastError') {
        res
          .status(404)
          .send({
            message: 'Карточка с указанным id не найдена',
          });
      } else {
        res
          .status(500)
          .send({
            message: `Произошла ошибка ${err.name}: ${err.message}`,
          });
      }
    });
};

const likeCard = (req, res) => {
  const userID = req.user._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userID } },
    { new: true },
  )
    .orFail(() => new Error('Not found'))
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({
            message: 'Переданы некорректные данные для постановки лайка',
          });
      // eslint-disable-next-line no-constant-condition
      } else if (err.name === 'Not found' || 'CastError') {
        res
          .status(404)
          .send({
            message: 'Передан несуществующий id карточки',
          });
      } else {
        res
          .status(500)
          .send({
            message: `Произошла ошибка ${err.name}: ${err.message}`,
          });
      }
    });
};

const dislikeCard = (req, res) => {
  const userID = req.user._id;
  const { cardId } = req.params;

  // eslint-disable-next-line no-console
  console.log(cardId);

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userID } },
    { new: true },
  )
    .orFail(() => new Error('Not found'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({
            message: 'Переданы некорректные данные для постановки лайка',
          });
      // eslint-disable-next-line no-constant-condition
      } else if (err.name === 'Not found' || 'CastError') {
        res
          .status(404)
          .send({
            message: 'Передан несуществующий id карточки',
          });
      } else {
        res
          .status(500)
          .send({
            message: `Произошла ошибка ${err.name}: ${err.message}`,
          });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};

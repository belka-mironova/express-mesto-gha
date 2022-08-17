const Card = require('../models/card');
const {
  RequestError,
  NotFoundError,
  ForbiddenError,
} = require('../errors');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const addCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new RequestError('Data is not valid or Bad request'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError(`Thre is no cards with id ${req.params.cardId}`);
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('You can delete only your cards'));
      }
      return card.remove()
        .then(() => res.send({ message: 'The card was deleted' }));
    })
    .catch(next);
};

const setLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError(`There is no card with id ${req.params.cardId}`);
    })
    .then((like) => res.send({ data: like }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new RequestError('Data is not valid or Bad request'));
      } else {
        next(err);
      }
    });
};

const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError(`There is no card with id ${req.params.cardId}`);
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new RequestError('Data is not valid or Bad request'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  addCard,
  deleteCard,
  setLike,
  deleteLike,
};

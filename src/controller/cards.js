const Card = require('../models/card');
const { errorMessage } = require('../utils/error');
const {
  RequestError,
  NotFoundError,
  ForbiddenError,
} = require('../errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => errorMessage(err, req, res));
};

const addCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then(res.status(201))
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new RequestError('Data is nor valid'));
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError(`Thre is no cards with ${req.params.cardId}`);
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('You can delete only your cards'));
      }
      return res.send({ data: card });
    })
    .catch(next);
};

const setLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError(`There is no card with id ${req.params.cardId}`);
    })
    .then((like) => res.send({ data: like }))
    .catch((err) => errorMessage(err, req, res));
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError(`There is no card with id ${req.params.cardId}`);
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorMessage(err, req, res));
};

module.exports = {
  getCards,
  addCard,
  deleteCard,
  setLike,
  deleteLike,
};

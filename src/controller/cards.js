const Card = require("../models/card");
const { errorMessage } = require("../../error.js");

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => errorMessage(err, req, res));
};

const addCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => res.send(card))
    .catch((err) => errorMessage(err, req, res));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send(card))
    .catch((err) => errorMessage(err, req, res));
};

const setLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send(card))
    .catch((err) => errorMessage(err, req, res));
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send(card))
    .catch((err) => errorMessage(err, req, res));
};

module.exports = { getCards, addCard, deleteCard, setLike, deleteLike };

const Card = require("../models/card");

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) =>
      res.status(500).send({ message: `Произошла ошибка ${err}` })
    );
};

const addCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => res.send(card))
    .catch((err) =>
      res.status(500).send({ message: `Произошла ошибка ${err}` })
    );
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send(card))
    .catch((err) =>
      res.status(500).send({ message: `Произошла ошибка ${err}` })
    );
};

const setLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send(card))
    .catch((err) =>
      res.status(500).send({ message: `Произошла ошибка ${err}` })
    );
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send(card))
    .catch((err) =>
      res.status(500).send({ message: `Произошла ошибка ${err}` })
    );
};

module.exports = { getCards, addCard, deleteCard, setLike, deleteLike };

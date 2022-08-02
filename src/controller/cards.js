const Card = require("../models/card");

const getCards = (req, res) => {
  Card.find({}).then((cards) => res.send({ data: cards }));
};

const addCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link }).then((card) => res.send(card));
};

const deleteCard = (req, res) => {
    Card.findByIdAndRemove(req.params.id).then((card) => res.send(card)).catch(err => res.status(500).send({ message: `Произошла ошибка ${err}` }));
  };

module.exports = { getCards, addCard, deleteCard };
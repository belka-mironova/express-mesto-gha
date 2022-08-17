const express = require('express');
const cardControllers = require('../controller/cards');
const { validateCardData, validateCardId } = require('../middlewares/validations');

const cardRoutes = express.Router();

cardRoutes.get('/', cardControllers.getCards);
cardRoutes.post('/', validateCardData, cardControllers.addCard);
cardRoutes.delete('/:cardId', validateCardId, cardControllers.deleteCard);
cardRoutes.put('/:cardId/likes', validateCardId, cardControllers.setLike);
cardRoutes.delete('/:cardId/likes', validateCardId, cardControllers.deleteLike);

module.exports = {
  cardRoutes,
};

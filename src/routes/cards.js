const express = require('express');
const cardControllers = require('../controller/cards');
const { validateCardData, validateId } = require('../middlewares/validations');

const cardRoutes = express.Router();

cardRoutes.get('/', cardControllers.getCards);
cardRoutes.post('/', validateCardData, cardControllers.addCard);
cardRoutes.delete('/:cardId', validateId, cardControllers.deleteCard);
cardRoutes.put('/:cardId/likes', validateId, cardControllers.setLike);
cardRoutes.delete('/:cardId/likes', validateId, cardControllers.deleteLike);

module.exports = {
  cardRoutes,
};

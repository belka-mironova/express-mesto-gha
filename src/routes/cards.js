const express = require("express");
const cardControllers = require("../controller/cards");
const cardRoutes = express.Router();

cardRoutes.get("/", cardControllers.getCards);
cardRoutes.post("/", cardControllers.addCard);
cardRoutes.delete("/:cardId", cardControllers.deleteCard);
cardRoutes.put("/:cardId/likes", cardControllers.setLike);
cardRoutes.delete("/:cardId/likes", cardControllers.deleteLike);

module.exports = {
  cardRoutes
};
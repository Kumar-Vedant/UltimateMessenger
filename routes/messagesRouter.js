const { Router } = require("express");
const messagesController = require("../controllers/messagesController");
const messagesRouter = Router();

messagesRouter.get("/:conversationId", messagesController.messagesListGet);

module.exports = messagesRouter;

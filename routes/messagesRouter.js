const { Router } = require("express");
const messagesController = require("../controllers/messagesController");
const messagesRouter = Router();

messagesRouter.get("/", messagesController.messagesListGet);
messagesRouter.post("/send", messagesController.messageSend);

module.exports = messagesRouter;

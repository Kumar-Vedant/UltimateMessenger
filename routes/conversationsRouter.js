const { Router } = require("express");
const conversationsController = require("../controllers/conversationsController");
const conversationsRouter = Router();

conversationsRouter.get("/", conversationsController.conversationsListGet);
conversationsRouter.post("/", conversationsController.conversationCreate);

module.exports = conversationsRouter;

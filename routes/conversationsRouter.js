const { Router } = require("express");
const conversationsController = require("../controllers/conversationsController");
const conversationsRouter = Router();

conversationsRouter.get("/", conversationsController.conversationsListGet);
conversationsRouter.post("/", conversationsController.conversationCreate);
conversationsRouter.post("/start", conversationsController.conversationStart);
conversationsRouter.get("/:id/:userId", conversationsController.conversationGet);

module.exports = conversationsRouter;

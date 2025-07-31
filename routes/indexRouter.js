const express = require("express");
const router = express.Router();
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// replace(temp)
const currentUserId = "41db83f7-05b2-4030-b827-25940a5bc20b";

router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        id: { not: currentUserId },
      },
    });
    res.render("index", { users });
  } catch (error) {
    console.error("Error loading users:", error);
    res.status(500).send("Error loading users");
  }
});

module.exports = router;

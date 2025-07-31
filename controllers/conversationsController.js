const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// GET all conversations (for debugging/admin use)
exports.conversationsListGet = async (req, res) => {
  try {
    const conversations = await prisma.conversation.findMany({
      include: { participants: true },
    });
    res.status(200).send(conversations);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching conversations");
  }
};

// JSON API to create or get conversation (used for AJAX)
exports.conversationCreate = async (req, res) => {
  const { userIds, isGroup, title } = req.body;

  try {
    const conversation = await getOrCreateConversation(userIds, isGroup, title);
    res.status(201).json({ conversation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create conversation" });
  }
};

// FORM-based version of starting a conversation (redirects to chat view)
exports.conversationStart = async (req, res) => {
  const senderId = req.body.senderId;
  const receiverId = req.body.receiverId;

  try {
    const conversation = await getOrCreateConversation([senderId, receiverId]);
    res.redirect(`/conversations/${conversation.id}/${senderId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to start conversation");
  }
};

// Renders chat UI with previous messages
exports.conversationGet = async (req, res) => {
  const conversationId = req.params.id;
  const userId = req.params.userId;

  try {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      include: { sender: true },
      orderBy: { createdAt: "asc" },
    });

    res.render("chat", { conversationId, senderId: userId, messages });
  } catch (err) {
    console.error("Error fetching conversation:", err);
    res.status(500).send("Internal server error");
  }
};

// Shared logic to find or create a conversation
async function getOrCreateConversation(userIds, isGroup = false, title = null) {
  const existing = await findExistingConversation(userIds, isGroup, title);
  if (existing) return existing;

  return await prisma.conversation.create({
    data: {
      isGroup,
      title,
      participants: {
        create: userIds.map((id) => ({ userId: id })),
      },
    },
    include: {
      participants: true,
    },
  });
}

// Helper to check for existing conversation
async function findExistingConversation(userIds, isGroup, title) {
  const conversations = await prisma.conversation.findMany({
    where: {
      isGroup: isGroup || false,
      title: title,
      participants: {
        every: {
          userId: {
            in: userIds,
          },
        },
      },
    },
    include: {
      participants: true,
    },
  });

  return conversations.find((conv) => conv.participants.length === userIds.length && conv.participants.every((p) => userIds.includes(p.userId)));
}

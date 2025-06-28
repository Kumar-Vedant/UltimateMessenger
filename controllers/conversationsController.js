const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

exports.conversationsListGet = async (req, res) => {
  try {
    const conversations = await prisma.conversation.findMany({
      include: {
        participants: true,
      },
    });
    res.status(200).send(conversations);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching conversations");
  }
};

exports.conversationCreate = async (req, res) => {
  const { userIds, isGroup, title } = req.body;

  try {
    // check if conversation already exists
    const existing = await findExistingConversation(userIds, isGroup, title);

    // if yes, return the existing one
    if (existing) {
      return res.status(200).json({ conversation: existing, existing: true });
    }

    // else, create a new conversation
    const conversation = await prisma.conversation.create({
      data: {
        isGroup: isGroup || false,
        title: title || null,
        participants: {
          create: userIds.map((id) => ({
            userId: id,
          })),
        },
      },
      include: {
        participants: true,
      },
    });

    res.status(201).json(conversation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create conversation" });
  }
};

exports.conversationGet = async (req, res) => {
  const conversationId = req.params.id;
  const userId = req.params.userId;

  try {
    // const conversation = await prisma.conversation.findUnique({
    //   where: { id: conversationId },
    //   include: {
    //     participants: true,
    //     messages: {
    //       include: {
    //         sender: true,
    //       },
    //       orderBy: { createdAt: "asc" },
    //     },
    //   },
    // });

    // if (!conversation) {
    //   return res.status(404).send("Conversation not found");
    // }

    // AFTER AUTH, get senderId from req!!!

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

// finds if a conversation already exists
async function findExistingConversation(userIds, isGroup, title) {
  // get all conversations with only the mentioned users in them and with the same title
  const conversations = await prisma.conversation.findMany({
    where: {
      participants: {
        every: {
          userId: {
            in: userIds,
          },
        },
      },
      isGroup: isGroup || false,
      title: title,
    },
    include: {
      participants: true,
    },
  });

  // return the one with the same no. of users
  return conversations.find((conv) => conv.participants.length === userIds.length && conv.participants.every((p) => userIds.includes(p.userId)));
}

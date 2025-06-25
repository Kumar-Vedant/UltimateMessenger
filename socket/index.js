const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_conversation", ({ conversationId }) => {
      socket.join(conversationId);
    });

    socket.on("leave_conversation", ({ conversationId }) => {
      socket.leave(conversationId);
    });

    socket.on("send_message", async ({ content, senderId, conversationId }) => {
      try {
        // save message to DB
        const message = await prisma.message.create({
          data: {
            content,
            senderId,
            conversationId,
            statuses: {
              create: {
                userId: senderId,
                status: "SENT",
              },
            },
          },
          include: {
            sender: true,
            statuses: true,
          },
        });

        // emit to the conversation room
        io.to(conversationId).emit("new_message", message);
      } catch (error) {
        console.error("Failed to send message:", error);
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    socket.on("message_read", async ({ messageId, userId, conversationId }) => {
      try {
        // update message status to READ
        await prisma.messageStatus.upsert({
          where: {
            messageId_userId: {
              messageId,
              userId,
            },
          },
          update: {
            status: "READ",
            updatedAt: new Date(),
          },
          create: {
            messageId,
            userId,
            status: "READ",
          },
        });

        io.to(conversationId).emit("message_read", { messageId, userId });
      } catch (error) {
        console.error("Failed to update message read status:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

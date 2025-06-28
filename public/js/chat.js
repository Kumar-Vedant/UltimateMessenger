// connect to the backend server
const socket = io();

const conversationId = document.getElementById("conversationId").value;
const senderId = document.getElementById("senderId").value;
const messageInput = document.getElementById("messageInput");
const messagesList = document.getElementById("messagesList");

socket.emit("join_conversation", { conversationId });

document.getElementById("sendButton").addEventListener("click", () => {
  const content = messageInput.value.trim();
  if (!content) return;

  socket.emit("send_message", { content, senderId, conversationId });
  messageInput.value = "";
});

// Append new message
socket.on("new_message", (message) => {
  const isSender = message.sender.id === senderId;

  const messageBubble = document.createElement("div");
  messageBubble.className = isSender ? "flex justify-end" : "flex justify-start";

  const bubbleContent = document.createElement("div");
  bubbleContent.className = isSender ? "bg-blue-600 text-white px-4 py-2 rounded-lg max-w-xs" : "bg-gray-700 text-white px-4 py-2 rounded-lg max-w-xs";

  const senderName = document.createElement("div");
  senderName.className = isSender ? "text-sm text-right text-gray-200 font-semibold mb-1" : "text-sm text-blue-300 font-semibold mb-1";
  senderName.textContent = message.sender.username;

  const messageText = document.createElement("div");
  messageText.textContent = message.content;

  bubbleContent.appendChild(senderName);
  bubbleContent.appendChild(messageText);
  messageBubble.appendChild(bubbleContent);

  messagesList.appendChild(messageBubble);
  messagesList.scrollTop = messagesList.scrollHeight; // auto-scroll
});

socket.on("message_read", ({ messageId, userId }) => {
  console.log(`Message ${messageId} read by user ${userId}`);
});


// Dummy messages data
const messages = [
  {
    id: "msg1",
    senderId: "1",
    receiverId: "2",
    content: "Hi Dr. Johnson, I've been experiencing more nausea in the mornings. Any dietary tips?",
    timestamp: "2025-04-10T09:30:00Z",
    read: true
  },
  {
    id: "msg2",
    senderId: "2",
    receiverId: "1",
    content: "Hello Emma, try eating a small protein-rich snack before getting out of bed in the morning. Crackers with a small amount of nut butter can help. Also, ginger tea has been shown to reduce nausea symptoms.",
    timestamp: "2025-04-10T10:15:00Z",
    read: true
  },
  {
    id: "msg3",
    senderId: "1",
    receiverId: "2",
    content: "Thank you, I'll try that tomorrow morning! Should I also adjust my dinner the night before?",
    timestamp: "2025-04-10T10:30:00Z",
    read: true
  },
  {
    id: "msg4",
    senderId: "2",
    receiverId: "1",
    content: "That's a good question. Try to have your evening meal at least 2-3 hours before bedtime and avoid spicy or fatty foods at dinner, as these can worsen nausea the next day.",
    timestamp: "2025-04-10T11:00:00Z",
    read: true
  },
  {
    id: "msg5",
    senderId: "1",
    receiverId: "2",
    content: "Got it, thanks! I'll implement these changes and let you know how it goes.",
    timestamp: "2025-04-10T11:10:00Z",
    read: true
  },
  {
    id: "msg6",
    senderId: "2",
    receiverId: "1",
    content: "I've looked at your recent meal plan and will make some adjustments to better manage the morning sickness. I'll share the updated plan by tomorrow.",
    timestamp: "2025-04-12T14:30:00Z",
    read: false
  }
];

/**
 * Get all messages
 */
const getAllMessages = (req, res) => {
  res.status(200).json(messages);
};

/**
 * Get messages by user
 */
const getMessagesByUser = (req, res) => {
  const userId = req.params.userId;
  const userMessages = messages.filter(
    message => message.senderId === userId || message.receiverId === userId
  );
  
  // Group messages by conversation
  const conversations = {};
  
  userMessages.forEach(message => {
    const otherUserId = message.senderId === userId ? message.receiverId : message.senderId;
    
    if (!conversations[otherUserId]) {
      conversations[otherUserId] = [];
    }
    
    conversations[otherUserId].push(message);
  });
  
  // Sort messages in each conversation by timestamp
  Object.keys(conversations).forEach(key => {
    conversations[key].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  });
  
  res.status(200).json({
    messages: userMessages,
    conversations
  });
};

/**
 * Send message
 */
const sendMessage = (req, res) => {
  const { senderId, receiverId, content } = req.body;
  
  const newMessage = {
    id: `msg${messages.length + 1}`,
    senderId,
    receiverId,
    content,
    timestamp: new Date().toISOString(),
    read: false
  };
  
  messages.push(newMessage);
  
  res.status(201).json(newMessage);
};

module.exports = {
  getAllMessages,
  getMessagesByUser,
  sendMessage
};

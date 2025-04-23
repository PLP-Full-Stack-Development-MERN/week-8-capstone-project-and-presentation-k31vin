
import api from './api';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface MessagesResponse {
  messages: Message[];
  conversations: Record<string, Message[]>;
}

const messageService = {
  getAllMessages: async (): Promise<Message[]> => {
    const response = await api.get('/messages');
    return response.data;
  },
  
  getMessagesByUser: async (userId: string): Promise<MessagesResponse> => {
    const response = await api.get(`/messages/user/${userId}`);
    return response.data;
  },
  
  sendMessage: async (messageData: { senderId: string; receiverId: string; content: string }): Promise<Message> => {
    const response = await api.post('/messages', messageData);
    return response.data;
  }
};

export default messageService;


import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import {
  Search,
  Send,
  File,
  FileQuestion,
  PaperclipIcon,
  Info,
  Phone,
  AlertTriangle,
  Check,
  MessageSquare,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  timestamp: string;
  attachments?: { name: string; type: string; url: string }[];
  read: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantRole: string;
  lastMessage: {
    content: string;
    timestamp: string;
    senderId: string;
  };
  unreadCount: number;
  online: boolean;
}

const MessageCenter = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAttaching, setIsAttaching] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real app, this would be an API call to get conversations
    // For now, we'll use mock data
    const mockConversations: Conversation[] = user?.role === "client"
      ? [
          {
            id: "conv1",
            participantId: "nutr1",
            participantName: "Dr. Jennifer Lee",
            participantAvatar: "/placeholder.svg",
            participantRole: "nutritionist",
            lastMessage: {
              content: "How are you feeling about the new meal plan?",
              timestamp: "10:30 AM",
              senderId: "nutr1",
            },
            unreadCount: 1,
            online: true,
          }
        ]
      : [
          {
            id: "conv1",
            participantId: "client1",
            participantName: "Emma Thompson",
            participantAvatar: "/placeholder.svg",
            participantRole: "client",
            lastMessage: {
              content: "I have a question about my breakfast options",
              timestamp: "9:45 AM",
              senderId: "client1",
            },
            unreadCount: 0,
            online: true,
          },
          {
            id: "conv2",
            participantId: "client2",
            participantName: "Sarah Johnson",
            participantAvatar: "/placeholder.svg",
            participantRole: "client",
            lastMessage: {
              content: "Thank you for the recommendations!",
              timestamp: "Yesterday",
              senderId: "client2",
            },
            unreadCount: 0,
            online: false,
          },
          {
            id: "conv3",
            participantId: "client3",
            participantName: "Rebecca Wilson",
            participantAvatar: "/placeholder.svg",
            participantRole: "client",
            lastMessage: {
              content: "I've updated my blood pressure readings",
              timestamp: "Yesterday",
              senderId: "client3",
            },
            unreadCount: 2,
            online: false,
          }
        ];

    setConversations(mockConversations);

    // Select first conversation by default if available
    if (mockConversations.length > 0 && !selectedConversation) {
      setSelectedConversation(mockConversations[0].id);
    }
  }, [user, selectedConversation]);

  useEffect(() => {
    if (selectedConversation) {
      // In a real app, this would be an API call to get messages
      // For now, we'll use mock data
      const mockMessages: Message[] = [
        {
          id: "msg1",
          content: "Hello! How are you doing today?",
          senderId: user?.role === "client" ? "nutr1" : "client1",
          senderName: user?.role === "client" ? "Dr. Jennifer Lee" : "Emma Thompson",
          senderRole: user?.role === "client" ? "nutritionist" : "client",
          timestamp: "10:15 AM",
          read: true
        },
        {
          id: "msg2",
          content: "I noticed your blood pressure readings from yesterday were a bit higher than usual. Have you been experiencing any stress?",
          senderId: user?.role === "client" ? "nutr1" : "client1",
          senderName: user?.role === "client" ? "Dr. Jennifer Lee" : "Emma Thompson",
          senderRole: user?.role === "client" ? "nutritionist" : "client",
          timestamp: "10:17 AM",
          read: true
        },
        {
          id: "msg3",
          content: "Yes, I've been having a busy week at work. Also, I've been finding it difficult to follow the meal plan exactly.",
          senderId: user?.id || "",
          senderName: user?.name || "",
          senderRole: user?.role || "",
          timestamp: "10:20 AM",
          read: true
        },
        {
          id: "msg4",
          content: "I understand. Work stress can definitely affect your health metrics. Let's make some adjustments to your meal plan to make it more manageable.",
          senderId: user?.role === "client" ? "nutr1" : "client1",
          senderName: user?.role === "client" ? "Dr. Jennifer Lee" : "Emma Thompson",
          senderRole: user?.role === "client" ? "nutritionist" : "client",
          timestamp: "10:22 AM",
          read: true
        },
        {
          id: "msg5",
          content: "I'm attaching some simpler recipe options that can be prepared ahead of time.",
          senderId: user?.role === "client" ? "nutr1" : "client1",
          senderName: user?.role === "client" ? "Dr. Jennifer Lee" : "Emma Thompson",
          senderRole: user?.role === "client" ? "nutritionist" : "client",
          timestamp: "10:23 AM",
          attachments: [
            {
              name: "Quick_Pregnancy_Recipes.pdf",
              type: "pdf",
              url: "#"
            }
          ],
          read: true
        },
        {
          id: "msg6",
          content: "Thank you! This is really helpful. I'll try these recipes this week.",
          senderId: user?.id || "",
          senderName: user?.name || "",
          senderRole: user?.role || "",
          timestamp: "10:28 AM",
          read: true
        },
        {
          id: "msg7",
          content: "Great! Let me know if you have any questions. Also, try to take some time to relax - even short meditation sessions can help with stress levels.",
          senderId: user?.role === "client" ? "nutr1" : "client1",
          senderName: user?.role === "client" ? "Dr. Jennifer Lee" : "Emma Thompson",
          senderRole: user?.role === "client" ? "nutritionist" : "client",
          timestamp: "10:30 AM",
          read: false
        },
      ];

      setMessages(mockMessages);

      // Mark conversation as read when selected
      setConversations(prevConversations =>
        prevConversations.map(conv =>
          conv.id === selectedConversation
            ? { ...conv, unreadCount: 0 }
            : conv
        )
      );
    }
  }, [selectedConversation, user]);

  useEffect(() => {
    // Scroll to bottom of messages when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: `msg${Date.now()}`,
      content: messageText,
      senderId: user?.id || "",
      senderName: user?.name || "",
      senderRole: user?.role || "",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };

    setMessages([...messages, newMessage]);
    setMessageText("");

    // Update last message in conversation list
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === selectedConversation
          ? {
              ...conv,
              lastMessage: {
                content: messageText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                senderId: user?.id || "",
              }
            }
          : conv
      )
    );

    // In a real app, this would be an API call to send the message
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully.",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAttachFile = () => {
    setIsAttaching(true);
    // In a real app, this would open a file picker
    
    setTimeout(() => {
      setIsAttaching(false);
      toast({
        title: "File attached",
        description: "Your file has been attached to the message.",
      });
    }, 1500);
  };

  const filteredConversations = conversations.filter(conv => 
    conv.participantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Find the selected conversation
  const currentConversation = conversations.find(conv => conv.id === selectedConversation);

  return (
    <div className="flex h-[calc(100vh-12rem)] overflow-hidden rounded-lg border shadow-sm">
      {/* Conversations sidebar */}
      <div className="w-full max-w-xs border-r bg-background">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Messages</h2>
            <Badge variant="outline">
              {conversations.reduce((total, conv) => total + conv.unreadCount, 0)} new
            </Badge>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search conversations..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Separator />
        <ScrollArea className="h-[calc(100vh-16rem)]">
          {filteredConversations.length > 0 ? (
            <div>
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  className={`w-full border-b p-4 text-left transition-colors hover:bg-muted/50 ${
                    selectedConversation === conversation.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <Avatar>
                        <AvatarImage src={conversation.participantAvatar} alt={conversation.participantName} />
                        <AvatarFallback>{conversation.participantName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500"></span>
                      )}
                    </div>
                    <div className="flex-1 space-y-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{conversation.participantName}</p>
                        <span className="text-xs text-muted-foreground">{conversation.lastMessage.timestamp}</span>
                      </div>
                      <p className="truncate text-sm text-muted-foreground">
                        {conversation.lastMessage.senderId === user?.id ? "You: " : ""}
                        {conversation.lastMessage.content}
                      </p>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {conversation.unreadCount}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <MessageSquare className="mb-2 h-8 w-8 text-muted-foreground" />
              <h3 className="text-lg font-medium">No conversations found</h3>
              <p className="text-sm text-muted-foreground">
                {searchTerm ? "Try a different search term" : "Start a new conversation to get help from your nutritionist"}
              </p>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Message content */}
      <div className="flex flex-1 flex-col">
        {selectedConversation && currentConversation ? (
          <>
            {/* Conversation header */}
            <div className="border-b bg-card px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={currentConversation.participantAvatar} alt={currentConversation.participantName} />
                    <AvatarFallback>{currentConversation.participantName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{currentConversation.participantName}</h3>
                    <p className="text-xs text-muted-foreground">
                      {currentConversation.online ? "Online" : "Offline"} • {
                        currentConversation.participantRole === "nutritionist" 
                          ? "Nutritionist" 
                          : "Client"
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Info className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.senderId === user?.id ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex max-w-[80%] gap-3 ${message.senderId === user?.id ? "flex-row-reverse" : ""}`}>
                      {message.senderId !== user?.id && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={currentConversation.participantAvatar} alt={message.senderName} />
                          <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div className="space-y-1">
                        <div
                          className={`rounded-lg p-3 ${
                            message.senderId === user?.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-2 space-y-2">
                              {message.attachments.map((attachment, index) => (
                                <div 
                                  key={index} 
                                  className={`flex items-center gap-2 rounded border p-2 ${
                                    message.senderId === user?.id 
                                      ? "border-primary-foreground/20 bg-primary-foreground/10" 
                                      : "border-muted-foreground/20 bg-background"
                                  }`}
                                >
                                  <File className="h-4 w-4" />
                                  <span className="text-xs font-medium">{attachment.name}</span>
                                  <Button variant="ghost" size="sm" className="ml-auto h-6 w-6 p-0">
                                    <FileQuestion className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div
                          className={`flex items-center gap-1 text-xs text-muted-foreground ${
                            message.senderId === user?.id ? "justify-end" : ""
                          }`}
                        >
                          <span>{message.timestamp}</span>
                          {message.senderId === user?.id && (
                            <span className="flex items-center">
                              {message.read ? (
                                <Check className="ml-1 h-3 w-3 text-blue-500" />
                              ) : (
                                <Check className="ml-1 h-3 w-3" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message input */}
            <div className="border-t bg-card p-4">
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="flex-shrink-0"
                  onClick={handleAttachFile}
                  disabled={isAttaching}
                >
                  <PaperclipIcon className="h-5 w-5" />
                </Button>
                <div className="relative flex-1">
                  <Input
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="pr-12"
                  />
                  <Button 
                    className="absolute right-1 top-1" 
                    size="sm" 
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <MessageSquare className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-xl font-medium">No conversation selected</h3>
            <p className="mt-2 text-muted-foreground">
              Choose a conversation from the list to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageCenter;

import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatPanel = ({ 
  isOpen = false, 
  onClose,
  participants = []
}) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Sarah Johnson",
      content: "Good morning everyone! Ready for today\'s standup?",
      timestamp: new Date(Date.now() - 300000),
      isCurrentUser: false
    },
    {
      id: 2,
      sender: "You",
      content: "Yes, let's get started!",
      timestamp: new Date(Date.now() - 240000),
      isCurrentUser: true
    },
    {
      id: 3,
      sender: "Mike Chen",
      content: "I\'ll share my screen to show the latest designs",
      timestamp: new Date(Date.now() - 180000),
      isCurrentUser: false
    },
    {
      id: 4,
      sender: "Emily Davis",
      content: "Sounds great! Looking forward to seeing the updates",
      timestamp: new Date(Date.now() - 120000),
      isCurrentUser: false
    }
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!newMessage?.trim()) return;

    const message = {
      id: Date.now(),
      sender: "You",
      content: newMessage?.trim(),
      timestamp: new Date(),
      isCurrentUser: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const formatTime = (timestamp) => {
    return timestamp?.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-16 bottom-20 w-80 bg-surface border-l border-border z-30 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="MessageSquare" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Chat</h3>
          <span className="text-sm text-muted-foreground">({messages?.length})</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="w-8 h-8"
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message) => (
          <div
            key={message?.id}
            className={`flex ${message?.isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message?.isCurrentUser ? 'order-2' : 'order-1'}`}>
              {!message?.isCurrentUser && (
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary-foreground">
                      {message?.sender?.split(' ')?.map(n => n?.[0])?.join('')}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{message?.sender}</span>
                  <span className="text-xs text-muted-foreground">{formatTime(message?.timestamp)}</span>
                </div>
              )}
              <div
                className={`rounded-lg px-3 py-2 ${
                  message?.isCurrentUser
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message?.content}</p>
                {message?.isCurrentUser && (
                  <p className="text-xs opacity-70 mt-1">{formatTime(message?.timestamp)}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
            <span className="text-sm">Someone is typing...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      {/* Message Input */}
      <div className="p-4 border-t border-border">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <div className="flex-1">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e?.target?.value)}
              onKeyPress={handleKeyPress}
              className="resize-none"
            />
          </div>
          <Button
            type="submit"
            size="icon"
            disabled={!newMessage?.trim()}
            className="w-10 h-10 flex-shrink-0"
          >
            <Icon name="Send" size={16} />
          </Button>
        </form>
        
        {/* Quick Actions */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="text-xs">
              <Icon name="Paperclip" size={12} className="mr-1" />
              File
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <Icon name="Smile" size={12} className="mr-1" />
              Emoji
            </Button>
          </div>
          <span className="text-xs text-muted-foreground">
            {participants?.length} participants
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
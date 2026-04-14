'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ChatMessage {
  id: number;
  sender: 'user' | 'trainer';
  message: string;
  timestamp: string;
  trainerName?: string;
  trainerAvatar?: string;
}

interface Trainer {
  id: number;
  name: string;
  specialization: string;
  avatar: string;
  status: 'online' | 'busy' | 'offline';
  responseTime: string;
}

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  const availableTrainers: Trainer[] = [
  {
    id: 1,
    name: 'Marcus Rodriguez',
    specialization: 'Strength & Performance',
    avatar: "https://images.unsplash.com/photo-1585803918973-53b14a6dceb1",
    status: 'online',
    responseTime: 'Usually responds in 2 min'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    specialization: 'Nutrition & Wellness',
    avatar: "https://images.unsplash.com/photo-1585803918973-53b14a6dceb1",
    status: 'online',
    responseTime: 'Usually responds in 1 min'
  },
  {
    id: 3,
    name: 'David Thompson',
    specialization: 'Cardio & Endurance',
    avatar: "https://images.unsplash.com/photo-1566505034708-f108b4a725cd",
    status: 'busy',
    responseTime: 'Usually responds in 15 min'
  }];


  const quickQuestions = [
  'What membership options do you have?',
  'Can I schedule a tour?',
  'Do you offer personal training?',
  'What are your hours?',
  'Is there a free trial?'];


  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial welcome message
      const welcomeMessage: ChatMessage = {
        id: 1,
        sender: 'trainer',
        message: 'Hi! Welcome to FitCore Elite. I\'m here to help you with any questions about our programs, membership, or facility. How can I assist you today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        trainerName: 'FitCore Assistant',
        trainerAvatar: "https://images.unsplash.com/photo-1704549060491-ea6946fe44fc"
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = (messageText: string = newMessage) => {
    if (!messageText.trim()) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      sender: 'user',
      message: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate trainer response
    setTimeout(() => {
      const responses = [
      'Great question! I\'d be happy to help you with that. Let me get you the most up-to-date information.',
      'That\'s a popular question! Our elite programs are designed specifically for that. Would you like me to connect you with one of our specialists?',
      'Absolutely! We have several options that would be perfect for your needs. Let me share some details with you.',
      'I can definitely help you with that. Our facility offers exactly what you\'re looking for. Would you like to schedule a tour?'];


      const trainerResponse: ChatMessage = {
        id: messages.length + 2,
        sender: 'trainer',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        trainerName: selectedTrainer?.name || 'FitCore Assistant',
        trainerAvatar: selectedTrainer?.avatar || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face'
      };

      setMessages((prev) => [...prev, trainerResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-modal transition-all duration-300 flex items-center justify-center ${
        isOpen ?
        'bg-error text-error-foreground hover:bg-error/90' :
        'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105'}`
        }>

        <Icon name={isOpen ? "XMarkIcon" : "ChatBubbleLeftRightIcon"} size={24} />
        
        {/* Online indicator */}
        {!isOpen &&
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-background flex items-center justify-center">
            <div className="w-2 h-2 bg-background rounded-full"></div>
          </div>
        }
      </button>

      {/* Chat Widget */}
      <div className={`fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] transition-all duration-300 ${
      isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'}`
      }>
        <div className="bg-card border border-border rounded-xl shadow-modal overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 bg-primary text-primary-foreground">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                    <Icon name="ChatBubbleLeftRightIcon" size={20} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-primary"></div>
                </div>
                <div>
                  <h4 className="font-semibold">Live Chat</h4>
                  <p className="text-xs opacity-90">Elite trainers online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-primary-foreground/20 rounded transition-colors duration-200">

                <Icon name="XMarkIcon" size={20} />
              </button>
            </div>
          </div>

          {/* Available Trainers */}
          {messages.length <= 1 &&
          <div className="p-4 border-b border-border">
              <h5 className="text-sm font-medium text-foreground mb-3">Available Trainers</h5>
              <div className="space-y-2">
                {availableTrainers.filter((t) => t.status === 'online').slice(0, 2).map((trainer) =>
              <button
                key={trainer.id}
                onClick={() => setSelectedTrainer(trainer)}
                className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                selectedTrainer?.id === trainer.id ?
                'border-primary bg-primary/10' : 'border-border hover:border-primary/50 hover:bg-muted/50'}`
                }>

                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                      src={trainer.avatar}
                      alt={`Professional headshot of ${trainer.name}, fitness trainer specializing in ${trainer.specialization}`}
                      className="w-8 h-8 rounded-full object-cover" />

                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border border-background"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{trainer.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{trainer.specialization}</p>
                      </div>
                    </div>
                  </button>
              )}
              </div>
            </div>
          }

          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message) =>
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>

                <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  {message.sender === 'trainer' &&
                <div className="flex items-center space-x-2 mb-1">
                      {message.trainerAvatar &&
                  <img
                    src={message.trainerAvatar}
                    alt={`Avatar of ${message.trainerName}, fitness trainer`}
                    className="w-6 h-6 rounded-full object-cover" />

                  }
                      <span className="text-xs text-muted-foreground">{message.trainerName}</span>
                    </div>
                }
                  <div className={`p-3 rounded-lg ${
                message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`
                }>
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`
                  }>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {isTyping &&
            <div className="flex justify-start">
                <div className="bg-muted text-foreground p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            }
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 &&
          <div className="p-4 border-t border-border">
              <h6 className="text-xs font-medium text-muted-foreground mb-2">Quick Questions</h6>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.slice(0, 3).map((question, index) =>
              <button
                key={index}
                onClick={() => sendMessage(question)}
                className="px-3 py-1.5 text-xs bg-muted text-muted-foreground rounded-full hover:bg-primary/10 hover:text-primary transition-colors duration-200">

                    {question}
                  </button>
              )}
              </div>
            </div>
          }

          {/* Message Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm" />

              <button
                onClick={() => sendMessage()}
                disabled={!newMessage.trim()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">

                <Icon name="PaperAirplaneIcon" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>);

};

export default LiveChatWidget;
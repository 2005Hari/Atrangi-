import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { Send, User, MoreVertical, Phone, Video } from 'lucide-react';

const MessagesPage = () => {
    const { messages, sendMessage, user } = useStore();
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (inputText.trim()) {
            sendMessage(inputText);
            setInputText('');
            sendMessage(inputText);
            setInputText('');
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-cream">
                <h2 className="text-2xl font-serif text-charcoal mb-4">Please log in to view messages</h2>
                <a href="/login" className="text-deep-saffron hover:underline">Sign In</a>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-10 bg-cream px-4 md:px-8">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden h-[80vh] flex">
                {/* Sidebar / Contact List */}
                <div className="w-1/3 border-r border-gray-100 hidden md:flex flex-col">
                    <div className="p-6 border-b border-gray-100 bg-gray-50">
                        <h2 className="text-xl font-bold text-charcoal">Messages</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {/* Contacts List */}
                        <div className="p-4 text-center text-gray-500 text-sm">
                            No conversations yet.
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" alt="Artist" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-bold text-charcoal">Aarav Patel</h3>
                                <span className="text-xs text-green-500 flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span> Online
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-400">
                            <button className="hover:text-deep-saffron"><Phone size={20} /></button>
                            <button className="hover:text-deep-saffron"><Video size={20} /></button>
                            <button className="hover:text-deep-saffron"><MoreVertical size={20} /></button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[70%] p-4 rounded-lg shadow-sm ${msg.sender === 'User'
                                        ? 'bg-deep-saffron text-white rounded-tr-none'
                                        : 'bg-white text-charcoal border border-gray-100 rounded-tl-none'
                                        }`}
                                >
                                    <p className="text-sm">{msg.text}</p>
                                    <span
                                        className={`text-[10px] block text-right mt-1 ${msg.sender === 'User' ? 'text-orange-100' : 'text-gray-400'
                                            }`}
                                    >
                                        {msg.timestamp}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex items-center space-x-4">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 border border-gray-200 rounded-full px-6 py-3 focus:outline-none focus:border-deep-saffron bg-gray-50"
                        />
                        <button
                            type="submit"
                            className="w-12 h-12 bg-deep-saffron text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg"
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MessagesPage;

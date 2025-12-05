import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react"; // beautiful icons
import "./chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi there! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Fake bot response
    setTimeout(() => {
      const botMessage = {
        sender: "bot",
        text: "Thanks for your message! 😊 We'll get back to you soon.",
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  return (
    <div className="chatbot-root">
      {/* Chatbot Toggle Button */}
      <button className="chatbot-icon-btn" onClick={toggleChat}>
        {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h4>Smart Assistant 🤖</h4>
            <button className="close-btn" onClick={toggleChat}>
              <X size={20} />
            </button>
          </div>

          <div className="chatbot-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-msg ${msg.sender === "user" ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form className="chatbot-input-area" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chatbot-input"
            />
            <button type="submit" className="chatbot-send-btn">
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

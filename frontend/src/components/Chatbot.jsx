import { useState } from "react";
import "./Chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm AutoParts AI Assistant. How can I help you?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/chatbot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
          }),
        }
      );

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            data.reply ||
            "Sorry, I could not understand that.",
        },
      ]);
    } catch (error) {
      console.error("Chatbot Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "Sorry, I am unable to connect to the AI assistant right now.",
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* AI BUTTON */}

      <div
        className={`ai-assist-button ${
          isOpen ? "active" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="ai-circle">
          ✨
        </div>

        <div className="ai-label">
          AI Assist
        </div>
      </div>


      {/* CHAT WINDOW */}

      {isOpen && (
        <div className="chatbot-window">

          {/* HEADER */}

          <div className="chatbot-header">

            <div>
              <h3>AutoParts AI</h3>

              <span>
                AI Assistant
              </span>
            </div>

            <button
              className="chat-close"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>

          </div>


          {/* MESSAGES */}

          <div className="chatbot-messages">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  msg.sender === "user"
                    ? "user-message"
                    : "bot-message"
                }`}
              >
                {msg.text}
              </div>
            ))}


            {loading && (
              <div className="chat-message bot-message">
                Thinking...
              </div>
            )}

          </div>


          {/* INPUT */}

          <div className="chatbot-input">

            <input
              type="text"
              placeholder="Ask about auto parts..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={handleKeyDown}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
            >
              ➤
            </button>

          </div>

        </div>
      )}
    </>
  );
}

export default Chatbot;
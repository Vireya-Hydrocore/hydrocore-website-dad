import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../styles/chatbot.css";

function ChatBotPage() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Olá! Como posso ajudar você hoje?" },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const senha = import.meta.env.VITE_CHATBOT_API_PASSWORD;
  const API_URL = import.meta.env.VITE_CHATBOT_API_URL;

  const handleSend = async () => {
    if (!input.trim() || isSending) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setIsSending(true);

    try {
      const response = await axios.post(
        API_URL,
        { user_message: userMessage },
        { headers: { Authorization: `Bearer ${senha}` } }
      );
      const botReply = response.data.resposta || "Resposta não disponível.";
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Erro ao enviar a requisição:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Ocorreu um erro. Tente novamente." },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  // Scroll automático para a última mensagem
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatbot-container">
      <div className="chatbot-chat-container" ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatbot-message ${msg.sender === "user" ? "chatbot-user" : "chatbot-bot"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chatbot-input-container">
        <input
          type="text"
          placeholder="Digite sua pergunta..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="chatbot-input"
          disabled={isSending}
        />
        <button
          onClick={handleSend}
          className="chatbot-button"
          disabled={isSending}
          title="Enviar"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
          >
            <path d="M8.99992 16V6.41407L5.70696 9.70704C5.31643 10.0976 4.68342 10.0976 4.29289 9.70704C3.90237 9.31652 3.90237 8.6835 4.29289 8.29298L9.29289 3.29298L9.36907 3.22462C9.76184 2.90427 10.3408 2.92686 10.707 3.29298L15.707 8.29298L15.7753 8.36915C16.0957 8.76192 16.0731 9.34092 15.707 9.70704C15.3408 10.0732 14.7618 10.0958 14.3691 9.7754L14.2929 9.70704L10.9999 6.41407V16C10.9999 16.5523 10.5522 17 9.99992 17C9.44764 17 8.99992 16.5523 8.99992 16Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatBotPage;

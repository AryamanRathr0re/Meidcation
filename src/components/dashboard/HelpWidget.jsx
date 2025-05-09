import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FaComments, FaTimes, FaPaperPlane } from "react-icons/fa";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 32px;
  right: 32px;
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0 4px 16px rgba(52, 152, 219, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  z-index: 4000;
  transition: background 0.2s;
  &:hover {
    background: #2980b9;
  }
`;

const ChatContainer = styled.div`
  position: fixed;
  bottom: 110px;
  right: 32px;
  width: 340px;
  max-width: 95vw;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(44, 62, 80, 0.18);
  z-index: 4001;
  animation: ${fadeIn} 0.4s;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background: #3498db;
  color: #fff;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 1rem;
  background: #f8f9fa;
  overflow-y: auto;
`;

const ChatInputRow = styled.form`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  background: #f5f7fa;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
`;

const SendButton = styled.button`
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #2980b9;
  }
`;

const Message = styled.div`
  margin-bottom: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
`;

const MessageBubble = styled.div`
  background: ${(props) => (props.isUser ? "#3498db" : "#e2e8f0")};
  color: ${(props) => (props.isUser ? "#fff" : "#2c3e50")};
  padding: 0.6rem 1rem;
  border-radius: 16px;
  max-width: 80%;
  font-size: 1rem;
  margin-bottom: 0.2rem;
`;

const HelpWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", isUser: false },
  ]);
  const [input, setInput] = useState("");
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (open && chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { text: input, isUser: true }]);
    setInput("");
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        {
          text: "Thank you for your message! A support agent will reply soon.",
          isUser: false,
        },
      ]);
    }, 1000);
  };

  return (
    <>
      <FloatingButton
        onClick={() => setOpen((o) => !o)}
        aria-label="Open help chat"
      >
        {open ? <FaTimes /> : <FaComments />}
      </FloatingButton>
      {open && (
        <ChatContainer>
          <ChatHeader>
            <span>Live Support</span>
            <FaTimes
              style={{ cursor: "pointer" }}
              onClick={() => setOpen(false)}
            />
          </ChatHeader>
          <ChatBody ref={chatBodyRef}>
            {messages.map((msg, idx) => (
              <Message key={idx} isUser={msg.isUser}>
                <MessageBubble isUser={msg.isUser}>{msg.text}</MessageBubble>
              </Message>
            ))}
          </ChatBody>
          <ChatInputRow onSubmit={handleSend}>
            <ChatInput
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <SendButton type="submit" aria-label="Send message">
              <FaPaperPlane />
            </SendButton>
          </ChatInputRow>
        </ChatContainer>
      )}
    </>
  );
};

export default HelpWidget;

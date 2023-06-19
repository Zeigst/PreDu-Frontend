import React, { useState } from "react"
import { ReactComponent as ChatIcon } from '../Resources/Icons/chat.svg'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

const ChatBot = () => {
  const [ isOpen, setOpen ] = useState(false)

  const toggleState = () => {
    setOpen(!isOpen)
  }

  return (
    <div className="chat-bot">
      <div className={`container ${isOpen ? "open" : ""}`}>
        <MainContainer className="main-container">
          <ChatContainer className="chat-container">
            <MessageList className="message-list">
              <Message
                model={{
                  message: "Hello. I am PreDuBot. Ask me if you need any help regarding the price of the products",
                  sentTime: "just now",
                  sender: "PreDuBot",
                }}
              />
            </MessageList>
            <MessageInput className="message-input" placeholder="Type message here" />
          </ChatContainer>
        </MainContainer>
      </div>
      <button className="chat-button" onClick={toggleState}>
        <ChatIcon className="icon"/>

      </button>
    </div>
  )
}

export default ChatBot
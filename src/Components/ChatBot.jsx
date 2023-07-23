import React, { useContext, useState } from "react"
import { ReactComponent as ChatIcon } from '../Resources/Icons/chat.svg'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { PreduContext } from "../PreduContext";
import axios from "axios";

const ChatBot = () => {
  const [ isOpen, setOpen ] = useState(false)
  const { api_path, chatHistory, addChatMessage } = useContext(PreduContext)

  const toggleState = () => {
    setOpen(!isOpen)
  }

  const handleSend = async(text) => {
    const newChatUser = {
      message: text,
      sender: "User",
      direction: "outgoing"
    }
    

    var newChatHistory = chatHistory
    addChatMessage(newChatUser)
    newChatHistory.push(newChatUser)



    const chat_api_1 = api_path + "/api/chatbot/layer-1"
    const chatSend = {
      text: text,
      chat_history : newChatHistory
    }
    const chatResponse = await axios.post(chat_api_1, chatSend)
    console.log(chatResponse)
    const newChatBot = {
      message: chatResponse.data.response,
      sender: "PreDu ChatBot",
      direction: "incoming"
    }
    addChatMessage(newChatBot)

    if (chatResponse.data.can_query === "True") {
      const chat_api_2 = api_path + "/api/chatbot/layer-2"
      const chatResponse2 = await axios.post(chat_api_2, chatSend)
      const newChatBot2 = {
        message: chatResponse2.data,
        sender: "PreDu ChatBot",
        direction: "incoming"
      }
      addChatMessage(newChatBot2)
    }

  }
  return (
    <div className="chat-bot">
      <div className={`container ${isOpen ? "open" : ""}`}>
        <MainContainer className="main-container">
          <ChatContainer className="chat-container">
            <MessageList className="message-list">
              {chatHistory.map((chat) => (
                <Message key={chat.message}
                model={{
                  message: chat.message,
                  sender: chat.sender,
                  direction: chat.direction
                }}>
                  <Message.Header sender={chat.sender}/>
                </Message>
              ))}
            </MessageList>
            <MessageInput className="message-input" attachButton={false} placeholder="Type message here" onSend={(e)=>{handleSend(e)}} />
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
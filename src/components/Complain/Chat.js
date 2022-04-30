import React from "react";

import { ProfileUserChat } from "../../assets";

export default function Chat({ contact, user, messages, sendMessage }) {
  return (
    <>
      {contact ? (
        <>
          <div
            id="chat-messages"
            style={{ height: "80vh" }}
            className="overflow-auto px-3 py-2"
          >
            {messages.map((item, index) => (
              <div key={index}>
                <div
                  className={`d-flex py-1 ${
                    item.idSender === user.id
                      ? "justify-content-end"
                      : "justify-content-start"
                  }`}
                >
                  {item.idSender !== user.id && (
                    <img
                      src={contact.profile?.image || ProfileUserChat}
                      className="rounded-circle me-2 img-chat"
                      alt="bubble avatar"
                    />
                  )}
                  <div
                    className={
                      item.idSender === user.id ? "chat-me" : "chat-other"
                    }
                  >
                    {item.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: "6vh" }} className="px-2">
            <input
              style={{ marginTop: "10px" }}
              placeholder="Send Message"
              className="input-message px-4 py-4"
              onKeyPress={sendMessage}
            />
          </div>
        </>
      ) : (
        <div
          style={{ height: "89.5vh" }}
          className="h4 d-flex justify-content-center align-items-center content-message-chat"
        >
          No Message
        </div>
      )}
    </>
  );
}

import React, { useState } from "react";
import useCloudinaryFileUpload from "./useCloudinaryFileUpload";
import FileUploader from "./FileUploader";
import { sendMessageGeneral } from './sendMessageFunction.js';
import { sendMessageToUser } from "./sendMessageFunction.js";
import imagesIcon from '../img/imagesIcon.png';
import { useLocation, useParams } from "react-router-dom";



const SendMessage = (event) => {
  
  const { setImageUrls } = useCloudinaryFileUpload();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { recipientUid } = useParams();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImageUrls([])
  };

  const doSendMessage = async () => {
    if (location.pathname.includes("/channel/")) {
      const generalId = location.pathname.split("/")[2];
      // Use generalId as needed
      await sendMessageGeneral(generalId, message);
    } else if (location.pathname.includes("/direct-message/")) {
      // Use id from useParams
      sendMessageToUser(recipientUid, message);
    }
    setMessage("");
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    await doSendMessage();
  };

  return (
    <form onSubmit={handleSendMessage} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div>
        <div
          onClick={handleOpen}
          style={{
            width: 40,
            height: 40,
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer"

          }}>
          <img
            src={imagesIcon}

            style={{
              width: "80%",
              height: "80%",
              display: "block"
            }}
          />
        </div>
        <FileUploader
          open={open}
          handleClose={handleClose}
        />
      </div>
      <button type="submit">Send</button>
    </form>
  );

};

export default SendMessage;

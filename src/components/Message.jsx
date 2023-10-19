import React from "react";
import { useRef, useEffect } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const Message = ({ message }) => {
  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [message]);

  console.log(message)
  const [user] = useAuthState(auth);
  return (
    <div className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
      <img className="chat-bubble__left" src={message.avatar} alt="user avatar" />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>

        {message.imgs.length > 0 && (
          <div style={{ minWidth: "200px", maxWidth: "300px", }}>
            <ImageList
              sx={{
                width: "100%",
                height: message.imgs.length > 3 ? 210 : 100,
              }}
              cols={Math.min(message.imgs.length, 3)}
              rowHeight={100}
            >
              {message.imgs.map((url, index) => (
                <ImageListItem key={index} style={{ position: 'relative' }}>
                  <img
                    srcSet={url}
                    src={url}
                    alt={`img-${index}`}
                    loading="lazy"
                    style={{
                      borderRadius: "5px",
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        )}
      </div>
    </div>
  );

};
export default Message;
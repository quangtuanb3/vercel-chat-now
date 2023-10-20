import React, { useEffect, useState, useRef } from "react";
import fetchMessages from "./fetchMessages"; // Make sure to import the fetchMessages function
import { auth } from "../firebase";
import { GoogleAuthProvider, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import { db } from "../firebase";
import {
    query,
    collection,
    orderBy,
    onSnapshot,
    limit,
} from "firebase/firestore";
import { useUserContext } from "../helper/UserContext";
import { useParams } from "react-router-dom";
import { ImageList, ImageListItem } from "@mui/material";

const RecipientComponent = () => {
    let { recipientUid } = useParams();

    const { user, setUser } = useUserContext();

    // if (!user) {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             setUser(user);
    //             console.log("auth.currentUser : ", user);
    //         }
    //     });

    // }



    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    console.log(" recipientUid ", recipientUid)

    useEffect(() => {
        // setUser(currentUser);

        const fetchData = async () => {
            const result = await fetchMessages(recipientUid, user?.uid);
            setMessages(result);
            if (result) {
                setLoading(false);
            }
        };

        fetchData();

        const unsubscribe = onSnapshot(collection(db, `${[recipientUid, user?.uid].sort().join("_")}`), (querySnapshot) => {
            const fetchedMessages = [];
            querySnapshot.forEach((doc) => {
                fetchedMessages.push({ ...doc.data(), id: doc.id });
            });
            const sortedMessages = fetchedMessages.sort((a, b) => a.createdAt - b.createdAt);
            setMessages(sortedMessages);
        });

        const scrollChatToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        };

        // Scroll to the last message when messages are fetched or updated
        scrollChatToBottom();

        return () => {
            unsubscribe(); // Cleanup the listener when the component unmounts
        };
    }, [user, recipientUid]); // Only re-run the effect if 'currentUser' changes


    return (
        <>
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : (messages.map((message, index) => {
                    return (
                        <div key={index}>
                            {user && <div className={`chat-bubble ${message.senderUid === user?.uid ? "right" : ""}`}>
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
                            </div>}
                        </div>

                    )

                })

                )}
            </div>
            <div ref={messagesEndRef} />
        </>

    );
};

export default RecipientComponent;

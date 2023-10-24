import React from "react";
import { useParams } from 'react-router-dom';
import Message from "../components/Message";
import SendMessage from "../components/SendMessage";
import { useEffect, useRef, useState } from "react";
import { query, collection, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db } from "../firebase";

import { NameBar } from "../components/NameBar"

const General = () => {
    let { id } = useParams();

    const [messages, setMessages] = useState([]);

    const scroll = useRef();
    // console.log(messages)
    useEffect(() => {
        const q = query(
            collection(db, `channel-${id}`),
            orderBy("createdAt", "desc"),
            limit(50)
        );

        // console.log(q)

        const subscribe = onSnapshot(q, (QuerySnapshot) => {
            const fetchedMessages = [];
            if (messages.length === QuerySnapshot.length) return;
            QuerySnapshot.forEach((doc) => {
                fetchedMessages.push({ ...doc.data(), id: doc.id });
            });
            const sortedMessages = fetchedMessages.sort(
                (a, b) => a.createdAt - b.createdAt
            );
            if (sortedMessages.length > 0 && sortedMessages[0].createdAt !== null) {
                setMessages(sortedMessages)
                scroll.current.scrollIntoView({ behavior: 'smooth' });
            }

        });
        //clear sub
        return () => subscribe;
    }, [messages]);

    return (
        <main className="chat-box">
            <NameBar />
            <div className="messages-wrapper">
                {messages?.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
                <span ref={scroll}></span>
            </div>
            {/* when a new message enters the chat, the screen scrolls down to the scroll div */}

            <SendMessage />
        </main>
    );
};

export default General;

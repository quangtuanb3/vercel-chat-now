import React from "react";
import { useParams } from 'react-router-dom';
import SendMessage from "../components/SendMessage";
import RecipientComponent from "../components/RecipientComponent";
import { useUserContext } from '../helper/UserContext'
import { useEffect, useRef, useState } from "react";
import { query, collection, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db } from "../firebase";
import { NameBar } from "../components/NameBar";

const DirectPage = () => {

    const { user, setUser } = useUserContext();


    let { recipientUid } = useParams();


    const [messages, setMessages] = useState([]);
    const scroll = useRef();

    useEffect(() => {
        const q = query(
            collection(db, [user?.uid, recipientUid].sort().join("_")),
            orderBy("createdAt", "desc"),
            limit(50)
        );

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            const fetchedMessages = [];
            QuerySnapshot.forEach((doc) => {
                fetchedMessages.push({ ...doc.data(), id: doc.id });
            });
            const sortedMessages = fetchedMessages.sort(
                (a, b) => a.createdAt - b.createdAt
            );
            setMessages(sortedMessages);
        });
        return () => unsubscribe;
    }, []);

    return (
        <main className="chat-box">
            <NameBar />
            <div className="messages-wrapper">
                <RecipientComponent />
            </div>
            {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
            <span ref={scroll}></span>
            <SendMessage scroll={scroll} />
        </main>
    );
};

export default DirectPage;

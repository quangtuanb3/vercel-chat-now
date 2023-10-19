import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatBox from "../components/ChatBox";
import Welcome from "../components/Welcome";
import { useUserContext } from '../helper/UserContext'
const HomePage = () => {
    const { user, setUser } = useUserContext();
    return (
        <>
            {!user ? (
                <Welcome />
            ) : (
                <>
                    <main className="chat-box">
                        <div className="messages-wrapper">
                            <h1 >Welcome to {user.displayName}</h1>
                            <h3 >Start new conversation now</h3>
                        </div>

                    </main>
                </>
            )
            }
        </>
    )
}

export default HomePage;
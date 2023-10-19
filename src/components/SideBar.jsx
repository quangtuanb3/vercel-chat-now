import React, { useState } from 'react';
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import './style/Sidebar.css';
import { useUserContext } from '../helper/UserContext'
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import users from '../AppConstant/users'



const Sidebar = () => {
    const { user, setUser } = useUserContext();
    const [activeItem, setActiveItem] = useState('Home');

    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    };

    if (!user) {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                console.log("auth.currentUser : ", user);
            }
        });

    }

    console.log("sidebar: ", user?.uid)

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };
    const signOut = () => {
        auth.signOut();
        setUser(null);
        window.location.href = "/";
    };

    const [isChannelOpen, setIsChannelOpen] = useState(false);
    const [isDirectMessageOpen, setIsDirectMessageOpen] = useState(false);

    const toggleChannel = () => {
        setIsChannelOpen(!isChannelOpen);
    };

    const toggleDirectMessage = () => {
        setIsDirectMessageOpen(!isDirectMessageOpen);
    };

    return (
        <div className="sidebar">
            <h1>Chat App</h1>
            <form>
                {/* Your search form here */}
            </form>
            {user ? <>  <ul>
                <li onClick={toggleChannel} style={{ fontWeight: "bold" }}>Channel
                    {isChannelOpen && (
                        <ul onClick={(e) => e.stopPropagation()} style={{ marginTop: 5, borderTop: "3px solid blue" }}>

                            <Link to="/channel/general" className="sign-in" style={{ textDecoration: "none" }}>
                                <li
                                    className={activeItem === 'general' ? 'active' : ''}
                                    onClick={() => handleItemClick('general')}
                                > #General </li></Link>

                            <Link to="/channel/random" className="sign-in" style={{ textDecoration: "none" }}>
                                <li
                                    className={activeItem === 'random' ? 'active' : ''}
                                    onClick={() => handleItemClick('random')}
                                > #Random </li></Link>

                        </ul>
                    )}
                </li>
                <li onClick={toggleDirectMessage} style={{ fontWeight: "bold" }}>Direct Message
                    {isDirectMessageOpen && (
                        <ul onClick={(e) => e.stopPropagation()} style={{ marginTop: 5, borderTop: "3px solid blue" }}>
                            {users.map(u => {
                                if (u.uid !== user.uid) {
                                    return (
                                        <Link
                                            key={u.uid}
                                            to={`/direct-message/${u.uid}`}
                                            className="sign-in"
                                            style={{
                                                textDecoration: "none",
                                                display: "flex", // Set display to flex
                                                alignItems: "center", // Align items vertically in the center
                                            }}
                                        >
                                            <li
                                                className={activeItem === u.uid ? 'active' : ''}
                                                onClick={() => handleItemClick(u.uid)}
                                                title={u.email} style={{ display: "flex", alignItems: "center" }}>
                                                <img
                                                    src={u.photoURL}
                                                    style={{ marginRight: "10px", width: 40, height: 40, borderRadius: "50%" }} // Adjust the margin as needed
                                                />
                                                <span style={{ display: "inline-block" }}>{u.displayName}</span>
                                            </li>
                                        </Link>


                                    )
                                }

                            })}


                        </ul>
                    )}
                </li>
            </ul ></> : <></>}


            <button onClick={signOut} disabled={!user} className={user?.uid || 'btn btn-secondary'} >Sign out</button>


        </div >
    );
};

export default Sidebar;

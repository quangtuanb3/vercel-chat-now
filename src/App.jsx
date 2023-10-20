import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import NavBar from "./components/NavBar";

import Sidebar from "./components/SideBar";
import SearchForm from "./components/SearchForm";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import General from "./pages/GeneralPage";
import DirectPage from "./pages/DirectPage";
import { UserProvider } from './helper/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <UserProvider>
            <Router>
                <Sidebar />
                <Routes>
                    <Route path="/chat-now/" element={<HomePage />} />
                    <Route path="/chat-now/channel/:id" element={<General />} />
                    <Route path="/chat-now/direct-message/:recipientUid" element={<DirectPage />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
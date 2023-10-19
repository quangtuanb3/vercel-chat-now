// sendMessage.js
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const sendMessageGeneral = async (generalId, message = "", imageUrls = []) => {
    if (!message.trim() && imageUrls.length === 0) {
        return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, `channel-${generalId}`), {
        text: message || "",
        name: displayName,
        avatar: photoURL,
        imgs: imageUrls || [],
        createdAt: serverTimestamp(),
        uid,
    });
};

export const sendMessageToUser = async (recipientUid, message = "", imageUrls = []) => {
    if (!recipientUid) {
        throw new Error("Recipient UID is required.");
    }

    if (!message.trim() && imageUrls.length === 0) {
        return;
    }

    try {
        const { uid, displayName, photoURL } = auth.currentUser;
        let collectionName = [uid, recipientUid].sort().join("_");

        const recipientDocRef = collection(db, `${collectionName}`);
        await addDoc(recipientDocRef, {
            text: message || "",
            name: displayName,
            avatar: photoURL,
            imgs: imageUrls || [],
            createdAt: serverTimestamp(),
            senderUid: uid,
            recipientUid: recipientUid
        });
    } catch (error) {
        console.error("Error sending message: ", error);
        throw error;
    }
};

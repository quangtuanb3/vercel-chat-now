import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const fetchMessages = async (senderUid, recipientUid) => {

  let collectionName = [senderUid, recipientUid].sort().join("_");
  console.log(collectionName)
  const messages = [];
  try {
    if (recipientUid) {
      const q = query(collection(db, collectionName));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
    }
  } catch (error) {
    console.error("Error fetching messages: ", error);
  }
  return messages;
};

export default fetchMessages;

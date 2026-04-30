import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export const updateSubscription = async (uid, planKey) => {
    if (!uid) throw new Error("User not found");

    await updateDoc(doc(db, "users", uid), {
        subscription: planKey,
    });
};

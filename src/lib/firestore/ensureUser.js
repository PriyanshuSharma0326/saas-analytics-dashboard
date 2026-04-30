import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebase";

export async function ensureUserInFirestore(user) {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        await setDoc(userRef, {
            name: user.displayName || "Anonymous",
            email: user.email,
            subscription: "free",
            createdAt: serverTimestamp(),
        });
    }
}

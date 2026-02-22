import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./firebase";

export const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
};

export const logoutUser = () => {
    return signOut(auth);
};

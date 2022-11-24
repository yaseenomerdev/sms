import React, { useState, useEffect, createContext, useContext } from "react";
import { createFirebaseApp } from "../fire/clientApp";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { type } from "os";

export type UserContextType = {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
};

export const UserContext: React.Context<any> = createContext(null);

export default function UserContextComp({ children }: any) {
  const [user, setUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true); // Helpful, to update the UI accordingly.

  useEffect(() => {
    // Listen authenticated user
    const app = createFirebaseApp();
    const auth = getAuth(app);
    const unsubscriber = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // User is signed in.
          const { uid, displayName, email, photoURL } = user;
          // You could also look for the user doc in your Firestore (if you have one):
          // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
          setUser({ uid, displayName, email, photoURL });
        } else setUser({});
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingUser(false);
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext);

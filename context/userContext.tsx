import React, { useState, useEffect, createContext, useContext } from "react";
import { createFirebaseApp } from "../fire/clientApp";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

type UserContextType = {
  user: Partial<User> | null;
  loading: boolean;
  setUser?: React.Dispatch<React.SetStateAction<Partial<User | null>>>;
};

export const UserContext: React.Context<Partial<UserContextType>> =
  createContext({} as ReturnType<typeof useUser>);

export default function UserContextComp({ children }: any) {
  const [user, setUser] = useState<Partial<User | null>>(null);
  const [loading, setLoadingUser] = useState(true); // Helpful, to update the UI accordingly.

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
        } else setUser(null);
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
    <UserContext.Provider
      value={{
        user,
        loading,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext);

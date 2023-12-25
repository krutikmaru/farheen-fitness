import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getDocs,
  collection,
  where,
  query,
  getFirestore,
} from "firebase/firestore";
import app from "../backend/Firebase/firebase";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const firestore = getFirestore(app);

    const fetchData = async () => {
      // The following code will run on auth change, so if the user is authenticated and page is refreshed then we check if the user is authenticated and if yes then we fetch the user data. So the user does not have to be authenticated again and again.

      const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
        if (authUser) {
          if (!user) {
            const usersCollectionRef = collection(firestore, "Users");
            const q = query(
              usersCollectionRef,
              where("email", "==", auth.currentUser.email)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              const userDocSnapshot = querySnapshot.docs[0];
              const userData = userDocSnapshot.data();
              setUser(userData);
            } else {
              console.log("User document not found");
            }
          }
        } else {
          setUser(null);
        }
      });

      // Cleanup subscription on component unmount
      return () => unsubscribe();
    };

    fetchData();
  }, [user]);

  const value = {
    user,
    setUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

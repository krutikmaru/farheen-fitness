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
import { userTrackData } from "../utils/data/userTrack";
import { goalsState } from "../utils/data/goalsBaseState";
import { formatDateToYYYYMMDD } from "../utils/functions/formatToYYYYMMDD";
import { fakeUserTrack } from "../utils/data/fakeUserTrack";
import { generateDateStringsFromDateToDate } from "../utils/functions/generateDateStringsFromDateToDate";

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
  const [goals, setGoals] = useState(goalsState);
  const [userTrack, setUserTrack] = useState(userTrackData);
  const [userTrack2, setUserTrack2] = useState(fakeUserTrack);
  const [today] = useState(formatDateToYYYYMMDD(new Date()));

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
              console.log("Fetching user track", userTrack2);
              console.log("Today", typeof Number(today));
              const todayDocumentExists = userTrack2.find(
                (track) => track.dateId === today
              );
              if (!todayDocumentExists) {
                const areAbsentRecords =
                  today - userTrack2[userTrack2.length - 1].dateId > 1;
                if (areAbsentRecords) {
                  const dateStrings = generateDateStringsFromDateToDate(
                    String(userTrack2[userTrack2.length - 1].dateId)
                  );
                  const missingDays = dateStrings.map((dateString) => {
                    return {
                      name: `hariameera@gmail.com_${dateString}`,
                      dateId: Number(dateString),
                      track: {
                        water: {
                          values: [],
                          time: [],
                        },
                        calories: {
                          values: [],
                          time: [],
                        },
                        sleep: {
                          values: [],
                          time: [],
                        },
                        steps: {
                          values: [],
                          time: [],
                        },
                      },
                    };
                  });
                  setUserTrack2([...userTrack2, ...missingDays]);
                  console.log([...userTrack2, ...missingDays]);
                }
              }

              // IMPORTANT 🚨
              // update goals using userData
              // await check if document for today exists then
              // await userTrack
              // else
              // create new document for today and then await userTrack (here check the last document for the user, if from that date till today, there are documents missing [user did not use the app], then create empty documents for those dates) [Hint: Subtract today's dateId from latest dateId and check if greater than 1]
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
    goals,
    setGoals,
    userTrack,
    setUserTrack,
    userTrack2,
    setUserTrack2,
    today,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

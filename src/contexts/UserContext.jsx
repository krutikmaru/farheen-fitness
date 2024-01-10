import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getDocs,
  collection,
  where,
  query,
  getFirestore,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import app from "../backend/Firebase/firebase";
import { userTrackData } from "../utils/data/userTrack";
import { goalsState } from "../utils/data/goalsBaseState";
import { formatDateToYYYYMMDD } from "../utils/functions/formatToYYYYMMDD";
import { generateDateStringsFromDateToDate } from "../utils/functions/generateDateStringsFromDateToDate";
import toast from "react-hot-toast";
import { roundToTwoDecimalPlaces } from "../utils/functions/roundToTwoDecimalPlace";
import {
  extractRecordsOfDay,
  extractRecordsOfMonth,
  extractRecordsOfYear,
} from "../utils/functions/extractRecords";
import {
  extractDay,
  extractMonth,
  extractYear,
} from "../utils/functions/extractFromYYYYMMDD";

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
  const [today] = useState(formatDateToYYYYMMDD(new Date()));

  const updateUser = async (updatedUser) => {
    const auth = getAuth();
    const firestore = getFirestore(app);
    try {
      const docRef = doc(firestore, "Users", auth.currentUser.email);
      await updateDoc(docRef, updatedUser);
      toast.success("Updated");
    } catch (e) {
      toast.error("Error updating");
      console.log(e);
    }
  };

  const updateTodaysTrack = async (updatedTrack) => {
    const auth = getAuth();
    const firestore = getFirestore(app);
    try {
      const docRef = doc(
        firestore,
        "UserTrack",
        `${updatedTrack.name}_${today}`
      );
      await updateDoc(docRef, updatedTrack);
      toast.success("Added");
    } catch (e) {
      toast.error("Error Adding");
      console.log(e);
    }
  };

  const getTotal = (records, userData, index) => {
    let total = 0;
    for (let i = 0; i < records.length; i++) {
      if (records[i].track[userData.goals[index].name].values.length !== 0) {
        total += records[i].track[userData.goals[index].name].values.reduce(
          (acc, val) => Number(acc) + Number(val)
        );
      }
    }
    return total;
  };

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
            const userQuerySnapshot = await getDocs(q);

            if (!userQuerySnapshot.empty) {
              const userDocSnapshot = userQuerySnapshot.docs[0];

              const userData = {
                ...userDocSnapshot.data(),
              };
              setUser(userData);

              const userTrackCollectionRef = collection(firestore, "UserTrack");
              const userTrackQuerySnapshot = await getDocs(
                userTrackCollectionRef
              );
              const userDocuments = [];

              userTrackQuerySnapshot.forEach((doc) => {
                if (doc.id.startsWith(auth.currentUser.email)) {
                  userDocuments.push(doc.data());
                }
              });

              console.log("userdocuments", userDocuments);

              const todayDocumentExists = userDocuments.find(
                (track) => track.dateId === Number(today)
              );
              console.log("todaysDocumentsExists", todayDocumentExists);

              if (!todayDocumentExists) {
                // Check if between the last and today's date, are there any missing track records
                const areAbsentRecords =
                  today - userDocuments[userDocuments.length - 1].dateId > 1;
                if (areAbsentRecords) {
                  const dateStrings = generateDateStringsFromDateToDate(
                    String(userDocuments[userDocuments.length - 1].dateId + 1)
                  );
                  for (let index = 0; index < dateStrings.length; index++) {
                    const userTrackCollection = collection(
                      firestore,
                      "UserTrack"
                    );
                    const userTrackDocRef = doc(
                      userTrackCollection,
                      `${auth.currentUser.email}_${Number(dateStrings[index])}`
                    );
                    await setDoc(userTrackDocRef, {
                      name: `${auth.currentUser.email}_${Number(
                        dateStrings[index]
                      )}`,
                      dateId: Number(dateStrings[index]),
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
                    });
                    userDocuments.push({
                      name: `${auth.currentUser.email}_${Number(
                        dateStrings[index]
                      )}`,
                      dateId: Number(dateStrings[index]),
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
                    });
                  }
                  setUserTrack(userDocuments);
                } else {
                  const userTrackCollection = collection(
                    firestore,
                    "UserTrack"
                  );
                  const userTrackDocRef = doc(
                    userTrackCollection,
                    `${auth.currentUser.email}_${today}`
                  );
                  await setDoc(userTrackDocRef, {
                    name: `${auth.currentUser.email}_${Number(today)}`,
                    dateId: Number(today),
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
                  });
                  userDocuments.push({
                    name: `${auth.currentUser.email}_${Number(today)}`,
                    dateId: Number(today),
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
                  });
                  setUserTrack(userDocuments);
                }
              } else {
                setUserTrack(userDocuments);
              }
              const goalsCopy = JSON.parse(JSON.stringify(goals));
              for (let index in userData.goals) {
                const correspondingGoalIndex = goalsCopy.findIndex(
                  (g) => g.name === userData.goals[index].name
                );
                goalsCopy[correspondingGoalIndex].isSet =
                  userData.goals[index].isSet;
                goalsCopy[correspondingGoalIndex].daily.target =
                  userData.goals[index].daily;
                goalsCopy[correspondingGoalIndex].monthly.target =
                  userData.goals[index].monthly;
                goalsCopy[correspondingGoalIndex].yearly.target =
                  userData.goals[index].yearly;

                const recordOfToday = extractRecordsOfDay(userDocuments, today);
                const recordsOfMonth = extractRecordsOfMonth(
                  userDocuments,
                  extractYear(today),
                  extractMonth(today)
                );
                const recordsOfYear = extractRecordsOfDay(userDocuments, today);

                goalsCopy[correspondingGoalIndex].daily.value = getTotal(
                  recordOfToday,
                  userData,
                  index
                );
                goalsCopy[correspondingGoalIndex].monthly.value = getTotal(
                  recordsOfMonth,
                  userData,
                  index
                );
                goalsCopy[correspondingGoalIndex].yearly.value = getTotal(
                  recordsOfYear,
                  userData,
                  index
                );
              }
              setGoals(goalsCopy);
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
  }, [goals, today, user]);

  const value = {
    user,
    setUser,
    goals,
    setGoals,
    userTrack,
    setUserTrack,
    today,
    updateUser,
    updateTodaysTrack,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

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
import { generateDateStringsFromDateToDate } from "../utils/functions/generateDateStringsFromDateToDate";
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
  // const [today] = useState(formatDateToYYYYMMDD(new Date()));
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
              // remove this goals array and add it to database
              const userData = {
                ...userDocSnapshot.data(),
                goals: [
                  {
                    name: "water",
                    isSet: true,
                    daily: 3,
                    monthly: 90,
                    yearly: 1080,
                  },
                  {
                    name: "calories",
                    isSet: true,
                    daily: 500,
                    monthly: 15000,
                    yearly: 180000,
                  },
                  {
                    name: "sleep",
                    isSet: true,
                    daily: 7,
                    monthly: 210,
                    yearly: 2520,
                  },
                  {
                    name: "steps",
                    isSet: false,
                    daily: 0,
                    monthly: 0,
                    yearly: 0,
                  },
                ],
              };
              setUser(userData);

              // fetch user tracks
              // createPossibleMissingRecords()

              // Make this a function
              // Checking if track document for today exists
              const todayDocumentExists = userTrack.find(
                (track) => track.dateId === today
              );
              if (!todayDocumentExists) {
                // Check if between the last and today's date, are there any missing track records
                const areAbsentRecords =
                  today - userTrack[userTrack.length - 1].dateId > 1;
                if (areAbsentRecords) {
                  const dateStrings = generateDateStringsFromDateToDate(
                    String(userTrack[userTrack.length - 1].dateId + 1)
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

                    // dummy data for today
                  });
                  missingDays[missingDays.length - 1].track.water.values = [
                    0.4, 0.6, 0.36,
                  ];
                  missingDays[missingDays.length - 1].track.water.time = [
                    "08:12",
                    "10:27",
                    "13:42",
                  ];
                  missingDays[missingDays.length - 1].track.calories.values = [
                    124, 176, 76,
                  ];
                  missingDays[missingDays.length - 1].track.calories.time = [
                    "09:07",
                    "11:28",
                    "13:54",
                  ];
                  missingDays[missingDays.length - 1].track.sleep.values = [
                    5, 1.5,
                  ];
                  missingDays[missingDays.length - 1].track.sleep.time = [
                    "12:08",
                    "15:00",
                  ];
                  setUserTrack([...userTrack, ...missingDays]);
                  const recordsOfYear = extractRecordsOfYear(
                    [...userTrack, ...missingDays],
                    extractYear(today)
                  );
                  const recordsOfMonth = extractRecordsOfMonth(
                    [...userTrack, ...missingDays],
                    extractYear(today),
                    extractMonth(today)
                  );
                  const recordOfToday = extractRecordsOfDay(
                    [...userTrack, ...missingDays],
                    today
                  );

                  console.log(recordsOfMonth);

                  let arr = [];

                  recordOfToday.map((record) => {
                    for (const key in record.track) {
                      let value = 0;
                      if (record.track[key].values.length !== 0) {
                        value = record.track[key].values.reduce(
                          (acc, val) => acc + val
                        );
                      }
                      arr = goals.map((goal) => {
                        if (goal.name === key) {
                          goal["daily"].value = roundToTwoDecimalPlaces(value);
                          goal["daily"].target = userData.goals.find((g) => {
                            return g.name === key;
                          })["daily"];
                          return goal;
                        }
                        return goal;
                      });
                    }
                  });

                  recordsOfMonth.map((record) => {
                    for (const key in record.track) {
                      let value = 0;
                      if (record.track[key].values.length !== 0) {
                        value = record.track[key].values.reduce(
                          (acc, val) => acc + val
                        );
                      }
                      arr = goals.map((goal) => {
                        if (goal.name === key) {
                          goal["monthly"].value =
                            roundToTwoDecimalPlaces(value);
                          goal["monthly"].target = userData.goals.find((g) => {
                            return g.name === key;
                          })["monthly"];
                          return goal;
                        }
                        return goal;
                      });
                    }
                  });

                  recordsOfYear.map((record) => {
                    for (const key in record.track) {
                      let value = 0;
                      if (record.track[key].values.length !== 0) {
                        value = record.track[key].values.reduce(
                          (acc, val) => acc + val
                        );
                      }
                      arr = goals.map((goal) => {
                        if (goal.name === key) {
                          goal["yearly"].value = roundToTwoDecimalPlaces(value);
                          goal["yearly"].target = userData.goals.find((g) => {
                            return g.name === key;
                          })["yearly"];
                          return goal;
                        }
                        return goal;
                      });
                    }
                  });
                  console.log(arr);
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
    today,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

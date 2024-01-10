import React, { useEffect, useState } from "react";
import { useApplicationManager } from "../../contexts/ApplicationContext";
import { workoutVideos } from "../../utils/data/workouts";
import WorkoutVideoElement from "../../Components/Reusables/WorkoutVideoElement";

const Workouts = () => {
  const [workouts, setWorkouts] = useState(workoutVideos);
  const [searchQuery, setSearchQuery] = useState("");

  const { setSelectedMenubarItemId } = useApplicationManager();
  useEffect(() => {
    setSelectedMenubarItemId("5fa9138bbfeb44a8a1f8287825247db0");
  }, [setSelectedMenubarItemId]);

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
    const filtered = workoutVideos.filter((workoutVideo) =>
      workoutVideo.title.toLowerCase().includes(query)
    );
    setWorkouts(filtered);
  };
  return (
    <div className=" flex w-full min-h-screen flex-col  p-8">
      <h1 className="text-2xl mb-4">
        <span className="text-green-primary">Workouts 💪🏼</span>
      </h1>
      <div className="mb-4  flex justify-start space-x-4 items-center">
        <div>
          <p className="text-[#747474] text-sm font-medium mb-1">Search</p>
          <div>
            <input
              value={searchQuery}
              onChange={(e) => handleSearchQueryChange(e.target.value)}
              placeholder="Search by Title"
              className="bg-[#161616] p-5 rounded-md  outline-none border-2 border-[#292929] h-10 placeholder:text-[#646464]"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        {workouts.map((workout, index) => {
          return (
            <WorkoutVideoElement key={workout.id} {...{ workout, index }} />
          );
        })}
      </div>
    </div>
  );
};

export default Workouts;

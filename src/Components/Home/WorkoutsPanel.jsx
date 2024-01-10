import React from "react";
import WorkoutVideoElement from "../Reusables/WorkoutVideoElement";
import { Link } from "react-router-dom";
import { workoutVideos } from "../../utils/data/workouts";

const WorkoutsPanel = () => {
  // randomize the videos and then getting the first four videos
  let videos = workoutVideos.sort(() => Math.random() - 0.5).slice(0, 4);
  return (
    <div className="mt-10 w-full ">
      <h1 className="text-2xl">Workouts</h1>
      <div className="w-full px-0 sm:px-5">
        <div className="bg-[#101010] min-h-[200px] p-5 mt-4 w-full flex flex-col space-y-4 rounded-md border-[1px] border-[#1a1a1a]">
          <div className="w-full flex items-center justify-between">
            <span className="text-[#707070]">Suggested for you</span>
            <Link
              to="/workouts"
              className=" text-sm cursor-pointer underline text-[#707070]"
            >
              View All
            </Link>
          </div>
          {videos.map((workout, index) => {
            return <WorkoutVideoElement key={index} {...{ workout, index }} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkoutsPanel;

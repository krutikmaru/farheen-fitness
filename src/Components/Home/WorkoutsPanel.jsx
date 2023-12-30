import React from "react";
import WorkoutVideoElement from "../Reusables/WorkoutVideoElement";

const WorkoutsPanel = () => {
  const workoutVideos = [
    {
      id: "BGXGdUj93BM",
      title: "15 MIN FULL BODY WORKOUT AT HOME",
      image: "https://img.youtube.com/vi/BGXGdUj93BM/mqdefault.jpg",
      category: "Full Body",
    },
    {
      id: "1iqzlhL95cI",
      title: "Complete Abs Workout in 7 Minutes",
      image: "https://img.youtube.com/vi/1iqzlhL95cI/mqdefault.jpg",
      category: "Abs",
    },
    {
      id: "Dk21IuMwpec",
      title: "Chest. Shoulder & ABS Workout (No Equipment, No gym)",
      image: "https://img.youtube.com/vi/Dk21IuMwpec/mqdefault.jpg",
      category: "Upper Body",
    },
    {
      id: "ALXh7L4cfKk",
      title: "10 MIN SIX PACK ABS WORKOUT AT HOME ",
      image: "https://img.youtube.com/vi/ALXh7L4cfKk/mqdefault.jpg",
      category: "Abs",
    },
  ];
  return (
    <div className="mt-10 w-full ">
      <h1 className="text-2xl">Workouts</h1>
      <div className="w-full px-0 sm:px-5">
        <div className="bg-[#101010] min-h-[200px] p-5 mt-4 w-full flex flex-col space-y-4 rounded-md border-[1px] border-[#1a1a1a]">
          <div className="w-full flex items-center justify-between">
            <span className="text-[#707070]">Suggested for you</span>
            <span className=" text-sm cursor-pointer underline text-[#707070]">
              View All
            </span>
          </div>
          {workoutVideos.map((workout, index) => {
            return <WorkoutVideoElement {...{ workout, index }} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkoutsPanel;

import React from "react";

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
      <div className="w-full px-5">
        <div className="bg-[#101010] min-h-[200px] p-5 mt-4 w-full flex flex-col space-y-4 rounded-md border-[1px] border-[#1a1a1a]">
          <div className="w-full flex items-center justify-between">
            <span className="text-[#707070]">Suggested for you</span>
            <span className=" text-sm cursor-pointer underline text-[#707070]">
              View All
            </span>
          </div>
          {workoutVideos.map((workout) => {
            return (
              <div
                key={workout.id}
                className="w-full min-h-[80px] bg-[#161616] rounded-md flex flex-col lg:flex-row items-center justify-start space-x-4 p-4 "
              >
                <div className="w-full lg:w-auto flex justify-center items-center">
                  <div className=" w-[100%] sm:w-[50%] sm:h-40 lg:w-24 lg:h-14 rounded-md relative overflow-hidden ">
                    <img
                      src={workout.image}
                      alt="Thumbnail"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-[70%]  mt-5 lg:mt-0 mx-5 lg:mx-0 whitespace-nowrap overflow-hidden text-ellipsis">
                  <h1 className="text-[#cfcfcf] text-xs sm:text-base">
                    {workout.title}
                  </h1>
                  <p className="text-xs text-[#707070]">
                    Category: {workout.category}
                  </p>
                </div>
                <div className="h-full w-full lg:w-[20%] mt-5 lg:mt-0  flex justify-center items-center">
                  <button className="w-full py-2 px-4 text-sm rounded-md font-medium text-[#101010] bg-green-primary flex justify-center items-center">
                    Watch
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkoutsPanel;

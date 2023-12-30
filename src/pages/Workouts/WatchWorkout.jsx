import React from "react";
import { useParams } from "react-router-dom";
import { workoutVideos } from "../../utils/data/workouts";

const WatchWorkout = () => {
  const { videoId } = useParams();
  const video = workoutVideos.find(
    (workoutVideo) => workoutVideo.id === videoId
  );

  return (
    <div className="flex w-full min-h-screen flex-col p-8">
      <h1 className="mb-5 text-2xl">{video.title}</h1>
      <iframe
        className="w-full h-screen"
        src={`https://www.youtube.com/embed/A3l6YYkXzzg`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={video.title}
      />
    </div>
  );
};

export default WatchWorkout;

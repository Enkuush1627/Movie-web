"use client"
import { use, useEffect, useState } from "react";
import ReactPlayer from 'react-player'

const MovieDetailPage = ({
  params,
}: {
  params: Promise<{ movieId: string }>
}) => {
    const { movieId } = use(params)
      const [movie, setMovie] = useState<MovieDetail>();
      const [video, setVideo] = useState<string>("");

    
      useEffect(() => {
        const fetchData = async () => {
          const res = await fetch(
            `https://api.themoviedb.org/3//movie/${movieId}?language=en-US`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjVlNTRlOGMwMDZjMzQ2OTQ4ZWU2ZDQzN2FkNWNiMyIsIm5iZiI6MTc2MzUyNDI2OS45ODMsInN1YiI6IjY5MWQzZWFkMzdkZTk2Y2NjOTJjOWJhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WpICXc-Ow5QiO9fEzG2vtIG2zVfY8H3IpOQ7gpkOM3Q`,
              },
            }
          );

          const videoRes = await fetch(
            `https://api.themoviedb.org/3//movie/${movieId}/videos?language=en-US`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjVlNTRlOGMwMDZjMzQ2OTQ4ZWU2ZDQzN2FkNWNiMyIsIm5iZiI6MTc2MzUyNDI2OS45ODMsInN1YiI6IjY5MWQzZWFkMzdkZTk2Y2NjOTJjOWJhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WpICXc-Ow5QiO9fEzG2vtIG2zVfY8H3IpOQ7gpkOM3Q`,
              },
            }
          );
          const data = await res.json();
          const videoData = await videoRes.json();

          console.log(videoData.results[1]?.key)

          setMovie(data);
          setVideo(videoData.results[1]?.key)
        };
        fetchData();
      }, []);
    return (
        <div className="">
            <div className="flex justify-between overflow-hidden">
                <img src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                className="w-[300px] h-[400px]"/>
                <ReactPlayer src={`https://www.youtube.com/watch?v=${video}`} width={1000} height={400}/>
            </div>
        </div>
    )
}

export default MovieDetailPage
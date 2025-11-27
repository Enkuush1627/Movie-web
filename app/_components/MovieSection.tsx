"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";

type MovieSectionProps = {
  categoryName: string;
  title?: string;
  showButton: boolean;
};

export const MovieSection = (props: MovieSectionProps) => {
  const [movies, setMovies] = useState<MovieDetail[]>([]);
  const { categoryName, title = "", showButton } = props;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${categoryName}?language=en-US&page=1`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjVlNTRlOGMwMDZjMzQ2OTQ4ZWU2ZDQzN2FkNWNiMyIsIm5iZiI6MTc2MzUyNDI2OS45ODMsInN1YiI6IjY5MWQzZWFkMzdkZTk2Y2NjOTJjOWJhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WpICXc-Ow5QiO9fEzG2vtIG2zVfY8H3IpOQ7gpkOM3Q`,
          },
        }
      );
      const data = await res.json();

      setMovies(data.results);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-6xl font-semibold">{title}</p>
        {showButton && (
          <Link href={`/category/${categoryName}`}>
            <p>see more</p>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-5 gap-10">
      {movies?.slice(0, 10).map((el) => (
        <MovieCard key={el.id} id={el.id}  backdrop_path={el.backdrop_path}  title={el.title}  vote_average={el.vote_average} />
      ))}
      </div>
    </div>
  );
};
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import { ArrowRight } from "lucide-react";
import { MovieCardSkeleton } from "./MovieCardSkelton";

type MovieSectionProps = {
  categoryName: string;
  title?: string;
  showButton: boolean;
  limit?: number;
};

export const MovieSection = (props: MovieSectionProps) => {
  const [movies, setMovies] = useState<MovieDetail[]>([]);
  const { categoryName, title = "", showButton } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${categoryName}?language=en-US&page=1`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjVlNTRlOGMwMDZjMzQ2OTQ4ZWU2ZDQzN2FkNWNiMyIsIm5iZiI6MTc2MzUyNDI2OS45ODMsInN1YiI6IjY5MWQzZWFkMzdkZTk2Y2NjOTJjOWJhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WpICXc-Ow5QiO9fEzG2vtIG2zVfY8H3IpOQ7gpkOM3Q`,
          },
        },
      );
      const data = await res.json();
      setLoading(true);
      setMovies(data.results);

      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[1440px]">
        <div className="flex py-12 justify-between items-center">
          <h3 className="text-2xl text-[#09090B] dark:text-white font-semibold">
            {title}
          </h3>
          {showButton && (
            <Link href={`/category/${categoryName}`}>
              <p className="flex items-center gap-3 font-medium text-sm dark:text-white text-[#09090B]">
                See more <ArrowRight size={9.33} />
              </p>
            </Link>
          )}
        </div>
        <div className="grid grid-cols-5 gap-10">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => (
                <MovieCardSkeleton key={i} />
              ))
            : movies
                .slice(0, 10)
                .map((el) => (
                  <MovieCard
                    key={el.id}
                    id={el.id}
                    poster_path={el.poster_path}
                    title={el.title}
                    vote_average={el.vote_average}
                  />
                ))}
        </div>
      </div>
    </div>
  );
};

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type MovieSectionProps = {
  categoryName: string;
  title: string;
  showButton: boolean;
};

export const MovieSection = (props: MovieSectionProps) => {
  const [movies, setMovies] = useState<MovieDetail[]>([]);
  const { categoryName, title, showButton } = props;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.TMDB_BASE_URL}/movie/${categoryName}?language=en-US&page=1`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
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

      {movies.map((el) => (
        <div key={el.id}>{el.title}</div>
      ))}
    </div>
  );
};
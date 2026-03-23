"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

export default function LikeThisPage({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId } = use(params);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (!movieId) return;

    const fetchLike = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        },
      );

      const data = await res.json();
      setMovies(data.results ?? []);
    };

    fetchLike();
  }, [movieId]);

  return (
    <section className="max-w-[1200px] w-full mx-auto px-6 mt-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold dark:text-white">More like this</h1>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {movies.slice(0, 10).map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <div className="cursor-pointer group">
              <div className="w-full h-[300px] bg-muted rounded-lg overflow-hidden">
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                )}
              </div>

              <p className="mt-2 text-sm font-medium truncate">{movie.title}</p>

              <p className="text-xs text-muted-foreground">
                ⭐{" "}
                {typeof movie.vote_average === "number"
                  ? movie.vote_average.toFixed(1)
                  : "-"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

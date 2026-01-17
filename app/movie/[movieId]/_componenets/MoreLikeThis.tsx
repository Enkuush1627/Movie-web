"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

type Props = {
  movieId: string;
};

export default function MoreLikeThis({ movieId }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchLike = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );

      const data = await res.json();
      console.log("SIMILAR:", data.results);

      setMovies(data.results ?? []);
    };

    fetchLike();
  }, [movieId]);

  if (!movies.length) return null;

  return (
    <section className="max-w-[1200px] w-full mt-16">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl text-[#09090B] font-semibold">
          More like this
        </h3>
        <Link href={`/movie/${movieId}/LikeThis`}>
          <span className="flex items-center gap-2 font-medium text-sm text-[#09090B] cursor-pointer">
            See more <ArrowRight size={16} />
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {movies.slice(0, 5).map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <div className="cursor-pointer group">
              <div className="w-full h-80 bg-muted rounded-lg overflow-hidden">
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
                  : "—"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

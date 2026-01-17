"use client";

import { use, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import MovieCredits from "./_componenets/MovieCredits";
import MoreLikeThis from "./_componenets/MoreLikeThis";
import MovieDetailSkeleton from "./_componenets/MovieDetailSkelton";

const MovieDetailPage = ({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) => {
  const { movieId } = use(params);

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        const [movieRes, videoRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
              },
            }
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
              },
            }
          ),
        ]);

        const movieData = await movieRes.json();
        const videoData = await videoRes.json();

        setMovie(movieData);
        setVideo(
          videoData.results?.find((v: any) => v.site === "YouTube")?.key ?? null
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [movieId]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <MovieDetailSkeleton />
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="flex justify-center">
      <section className="w-270 mt-10">
        <h1 className="text-4xl font-bold">{movie.title}</h1>

        <p className="text-lg text-muted-foreground mt-2">
          {movie.release_date?.slice(0, 4)} ·{" "}
          {movie.runtime ? `${movie.runtime} min` : "—"}
        </p>

        <div className="flex gap-6 mt-6">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            className="w-[290px] h-[428px] rounded-lg"
          />

          {video && (
            <ReactPlayer
              src={`https://www.youtube.com/watch?v=${video}`}
              width={760}
              height={428}
            />
          )}
        </div>

        <div className="flex gap-2 mt-4 flex-wrap">
          {movie.genres?.map((genre) => (
            <span
              key={genre.id}
              className="px-3 py-1 rounded-full border text-xs font-medium"
            >
              {genre.name}
            </span>
          ))}
        </div>

        <p className="mt-6 text-muted-foreground max-w-[900px]">
          {movie.overview}
        </p>

        <MovieCredits movieId={movieId} />
        <MoreLikeThis movieId={movieId} />
      </section>
    </div>
  );
};

export default MovieDetailPage;

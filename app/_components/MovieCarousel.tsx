"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Play, Star } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MovieCarouselSkeleton } from "./MovieCarouselSkelton";

type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path?: string | null;
  vote_average: number;
};

export const MovieCarousel = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
            },
          },
        );

        if (!res.ok) {
          console.error("TMDB fetch failed:", res.status);
          setMovies([]);
          return;
        }

        const data = await res.json();
        setMovies(data.results?.slice(0, 5) ?? []);
      } catch (err) {
        console.error("Fetch error:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const watchTrailer = async (movieId: number) => {
    try {
      setTrailerKey(null);

      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        },
      );

      if (!res.ok) return;

      const data = await res.json();

      const trailer =
        data.results?.find(
          (v: any) => v.type === "Trailer" && v.site === "YouTube",
        ) || data.results?.[0];

      if (trailer) setTrailerKey(trailer.key);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <MovieCarouselSkeleton />;

  return (
    <section className="w-full">
      <Carousel
        opts={{ align: "start", loop: true }}
        className="relative w-full"
      >
        <CarouselContent>
          {movies.length === 0 && (
            <div className="w-full h-[600px] flex items-center justify-center text-white">
              No movies found
            </div>
          )}

          {movies.map((movie) => {
            const hasImage = movie.backdrop_path && !imageErrors[movie.id];

            return (
              <CarouselItem key={movie.id}>
                <div className="relative w-full h-[600px] bg-black flex items-center justify-center overflow-hidden">
                  {hasImage ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      alt={movie.title}
                      fill
                      className="object-cover"
                      onError={() =>
                        setImageErrors((prev) => ({
                          ...prev,
                          [movie.id]: true,
                        }))
                      }
                    />
                  ) : (
                    <img
                      src="/placeholder.png"
                      alt="no image"
                      className="w-40 opacity-60"
                    />
                  )}

                  <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />

                  <div className="absolute left-16 bottom-24 max-w-lg text-white z-10">
                    <p className="text-sm opacity-80 mb-2">Now Playing</p>

                    <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>

                    <div className="flex items-center gap-2 mb-4">
                      <Star size={16} className="text-yellow-400" />
                      {movie.vote_average.toFixed(1)}
                    </div>

                    <p className="text-sm line-clamp-3 mb-6">
                      {movie.overview}
                    </p>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => watchTrailer(movie.id)}
                          className="bg-white text-black rounded-sm"
                        >
                          <Play />
                          Watch Trailer
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="bg-black border-none p-0 rounded-xl overflow-hidden min-h-[60vh] min-w-[70vw]">
                        {trailerKey && (
                          <iframe
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            allowFullScreen
                            className="w-full h-full"
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="left-6 bg-black/50 hover:bg-black/70 text-white border-none" />
        <CarouselNext className="right-6 bg-black/50 hover:bg-black/70 text-white border-none" />
      </Carousel>
    </section>
  );
};

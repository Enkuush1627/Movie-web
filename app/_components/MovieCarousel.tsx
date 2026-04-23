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
import { Skeleton } from "@/components/ui/skeleton";
import { getImage } from "@/lib/getImage";

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

  // 👉 image бүрийн loading state
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

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

        const data = await res.json();
        setMovies(data.results?.slice(0, 5) ?? []);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const watchTrailer = async (movieId: number) => {
    setTrailerKey(null);

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
      },
    );

    const data = await res.json();
    const trailer =
      data.results?.find((v: any) => v.type === "Trailer") || data.results?.[0];

    if (trailer) setTrailerKey(trailer.key);
  };

  // 👉 page level skeleton
  if (loading) return <MovieCarouselSkeleton />;

  return (
    <section className="w-full">
      <Carousel opts={{ loop: true }} className="relative w-full">
        <CarouselContent>
          {movies.map((movie) => (
            <CarouselItem key={movie.id}>
              <div className="relative w-full h-[600px] overflow-hidden">
                {!imageLoaded[movie.id] && (
                  <Skeleton className="absolute inset-0 z-0" />
                )}

                <Image
                  src={getImage(movie.backdrop_path)}
                  alt={movie.title}
                  fill
                  className={`object-cover transition-opacity duration-500 ${
                    imageLoaded[movie.id] ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() =>
                    setImageLoaded((prev) => ({
                      ...prev,
                      [movie.id]: true,
                    }))
                  }
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/placeholder.png";

                    setImageLoaded((prev) => ({
                      ...prev,
                      [movie.id]: true,
                    }));
                  }}
                />

                <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />

                <div className="absolute left-16 bottom-24 max-w-lg text-white z-10">
                  <p className="text-sm opacity-80 mb-2">Now Playing</p>

                  <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>

                  <div className="flex items-center gap-2 mb-4">
                    <Star size={16} className="text-yellow-400" />
                    {movie.vote_average.toFixed(1)}
                  </div>

                  <p className="text-sm line-clamp-3 mb-6">{movie.overview}</p>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => watchTrailer(movie.id)}
                        className="bg-white text-black"
                      >
                        <Play /> Watch Trailer
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="bg-black p-0">
                      {trailerKey && (
                        <iframe
                          src={`https://www.youtube.com/embed/${trailerKey}`}
                          className="w-full h-[500px]"
                          allowFullScreen
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-6" />
        <CarouselNext className="right-6" />
      </Carousel>
    </section>
  );
};

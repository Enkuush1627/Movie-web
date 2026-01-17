"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MovieCard } from "@/app/_components/MovieCard";
import { MovieCardSkeleton } from "@/app/_components/MovieCardSkelton";
import { ChevronRight } from "lucide-react";

type Genre = {
  id: number;
  name: string;
};

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

type MoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export default function GenreClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const idsParam = searchParams.get("ids") ?? "";
  const page = Number(searchParams.get("page") ?? 1);
  const selectedGenres = idsParam ? idsParam.split(",") : [];

  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<MoviesResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setGenres(data.genres ?? []));
  }, []);

  useEffect(() => {
    if (!idsParam) {
      setMovies(null);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);

      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${idsParam}&page=${page}&sort_by=popularity.desc`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );

      const data = await res.json();
      setMovies(data);
      setLoading(false);
    };

    fetchMovies();
  }, [idsParam, page]);

  const toggleGenre = (id: number) => {
    let next = [...selectedGenres];

    if (next.includes(String(id))) {
      next = next.filter((g) => g !== String(id));
    } else {
      next.push(String(id));
    }

    router.push(next.length ? `/genre?ids=${next.join(",")}&page=1` : "/genre");
  };

  return (
    <section className="flex justify-center py-10">
      <div className="w-7xl flex gap-12">
        <aside className="w-[260px]">
          <p className="text-sm text-muted-foreground mb-4">Search filter</p>

          <h3 className="font-semibold mb-3">Genres</h3>

          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => {
              const active = selectedGenres.includes(String(genre.id));

              return (
                <Button
                  key={genre.id}
                  variant="outline"
                  onClick={() => toggleGenre(genre.id)}
                  className={`rounded-full text-xs h-5 font-semibold ${
                    active ? "bg-black text-white" : ""
                  }`}
                >
                  {genre.name} <ChevronRight />
                </Button>
              );
            })}
          </div>
        </aside>

        <main className="flex-1 border-l pl-12">
          {!idsParam && (
            <p className="text-muted-foreground">Select genres to see movies</p>
          )}

          {loading && (
            <div className="grid grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <MovieCardSkeleton key={i} />
              ))}
            </div>
          )}

          {movies && !loading && (
            <>
              <p className="text-lg font-semibold mb-6">
                {movies.total_results} titles found
              </p>

              <div className="grid grid-cols-4 gap-6">
                {movies.results.slice(0, 12).map((movie) => (
                  <Link key={movie.id} href={`/movie/${movie.id}`}>
                    <MovieCard
                      {...movie}
                      poster_path={movie.poster_path ?? undefined}
                    />
                  </Link>
                ))}
              </div>

              {movies.total_pages > 1 && (
                <div className="mt-12 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      {page > 1 && (
                        <PaginationItem>
                          <PaginationPrevious
                            href={`/genre?ids=${idsParam}&page=${page - 1}`}
                          />
                        </PaginationItem>
                      )}

                      <PaginationItem>
                        <PaginationLink isActive>{page}</PaginationLink>
                      </PaginationItem>

                      {page < movies.total_pages && (
                        <PaginationItem>
                          <PaginationNext
                            href={`/genre?ids=${idsParam}&page=${page + 1}`}
                          />
                        </PaginationItem>
                      )}
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </section>
  );
}

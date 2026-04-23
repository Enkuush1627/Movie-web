"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Genre = {
  id: number;
  name: string;
};

export default function MovieGenre() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
            },
          },
        );

        if (!res.ok) {
          console.error("Failed to fetch genres");
          setGenres([]);
          return;
        }

        const data = await res.json();
        setGenres(data.genres ?? []);
      } catch (err) {
        console.error(err);
        setGenres([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="font-medium">
          <ChevronDown className="mr-1" />
          Genres
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-[560px]">
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="text-2xl font-semibold">Genres</h3>
            <p className="text-sm text-muted-foreground">
              See lists of movies by genre
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {loading && (
              <p className="text-sm text-muted-foreground">Loading...</p>
            )}

            {!loading &&
              genres.length > 0 &&
              genres.map((genre) => (
                <Link key={genre.id} href={`/genre?ids=${genre.id}`}>
                  <Button className="flex items-center gap-2 bg-white text-black h-5 rounded-full border text-xs font-semibold hover:bg-muted">
                    {genre.name}
                    <ChevronRight size={14} />
                  </Button>
                </Link>
              ))}

            {!loading && genres.length === 0 && (
              <div className="w-full flex flex-col items-center justify-center py-6 text-muted-foreground">
                <img
                  src="/placeholder.png"
                  alt="no genres"
                  className="w-16 opacity-60 mb-2"
                />
                <p className="text-sm">No genres found</p>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

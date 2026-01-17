"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";

type Genre = {
  id: number;
  name: string;
};

export default function MovieGenre() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        }
      );

      const data = await res.json();
      setGenres(data.genres ?? []);
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
            {genres.map((genre) => (
              <Link href={`/genre?ids=${genre.id}`}>
                <Button
                  key={genre.id}
                  className="flex items-center gap-2 bg-white text-black h-5 rounded-full border text-xs font-semibold hover:bg-muted"
                >
                  {genre.name}
                  <ChevronRight size={14} />
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

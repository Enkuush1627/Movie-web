"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w92";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
};

const SearchSkeleton = () => (
  <div className="flex gap-3 p-3 w-full">
    <Skeleton className="w-[67px] h-[90px] rounded-md" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/4" />
    </div>
  </div>
);

export default function MovieSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    const controller = new AbortController();

    const fetchSearch = async () => {
      try {
        setLoading(true);
        setOpen(true);

        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            query
          )}&language=en-US&page=1&include_adult=false`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
            },
            signal: controller.signal,
          }
        );

        const data = await res.json();
        setResults(data.results ?? []);
      } catch (e) {
        if (e instanceof Error && e.name !== "AbortError") {
          console.error(e);
        }
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchSearch, 400);
    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [query]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-[379px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="pl-12 rounded-lg"
          />
        </div>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-[577px] p-0 z-50">
        <div className="max-h-[360px] overflow-y-auto">
          {loading && (
            <>
              {Array.from({ length: 4 }).map((_, i) => (
                <SearchSkeleton key={i} />
              ))}
            </>
          )}

          {!loading && results.length === 0 && (
            <p className="p-8 text-sm text-center">No results found</p>
          )}

          {!loading &&
            results.slice(0, 6).map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  router.push(`/movie/${movie.id}`);
                  setOpen(false);
                  setQuery("");
                }}
                className="flex gap-3 p-3 cursor-pointer hover:bg-muted transition justify-between"
              >
                <div className="w-[67px] h-[90px] relative bg-muted rounded overflow-hidden">
                  {movie.poster_path && (
                    <Image
                      src={`${IMAGE_BASE}${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium">{movie.title}</p>
                  {movie.release_date && (
                    <p className="text-xs text-muted-foreground">
                      {movie.release_date.slice(0, 4)}
                    </p>
                  )}
                </div>

                <div className="flex items-end gap-1 text-sm font-medium">
                  See more <ArrowRight size={16} />
                </div>
              </div>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

import { Film, Mail, Phone } from "lucide-react";
import MovieSearch from "./movieSearch";
import Link from "next/link";
import MovieGenre from "./MovieGenre";
import { ThemeToggle } from "./MovieTheme";

export default function MovieHeader() {
  return (
    <div className="w-full h-[59px] justify-center items-center flex">
      <div className="w-7xl h-9 flex items-center justify-between">
        <Link href={`/`}>
          <p className="flex items-center gap-2 text-[#4338CA] text-base font-bold">
            <Film />
            Movie Z
          </p>
        </Link>
        <div className="flex gap-3">
          <MovieGenre />
          <MovieSearch />
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
}

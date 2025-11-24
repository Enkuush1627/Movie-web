import Image from "next/image";
import { MovieCard } from "./_components/MovieCard";
import { MovieSection } from "./_components/MovieSection";
export default function Home() {
  return (
  <div>
      <div className=" gap-96 bg-red-200">
        <MovieSection
          categoryName="upcoming"
          title="Upcoming"
          showButton={true}
        />
        </div>
      <div className=" gap-96 bg-amber-200">
        <MovieSection
          categoryName="top_rated"
          title="Top Rated"
          showButton={true}
        />
      </div>
      <div className=" gap-96 bg-blue-200">
        <MovieSection
          categoryName="popular"
          title="Popular"
          showButton={true}
        />
      </div>
    </div>
  );
}

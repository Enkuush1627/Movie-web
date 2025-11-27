import Image from "next/image";
import { MovieCard } from "./_components/MovieCard";
import { MovieSection } from "./_components/MovieSection";
import { title } from "process";
export default function Home() {
  const categories = [{
    categoryName: "upcoming",
    title: "Upcoming",
    showButton: true
  },
  {categoryName: "top_rated", title: "Top Rated", showButton: true},
{categoryName: "popular", title: "Popular", showButton: true}]
  return (
  <div>
    {categories.map((category) => {
      return (
      <MovieSection key={category.categoryName}
      categoryName={category.categoryName}
      title={category.title}
      showButton={category.showButton}
      />
      )
    })}
    </div>
  );
}

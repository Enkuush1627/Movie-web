"use client";
import { MovieCarousel } from "./_components/MovieCarousel";
import Footer from "./_components/MovieFooter";
import { MovieSection } from "./_components/MovieSection";
export default function Home() {
  const categories = [
    {
      categoryName: "upcoming",
      title: "Upcoming",
      showButton: true,
    },
    { categoryName: "top_rated", title: "Top Rated", showButton: true },
    { categoryName: "popular", title: "Popular", showButton: true },
  ];
  return (
    <div>
      <MovieCarousel />
      <div>
        {categories.map((category) => {
          return (
            <MovieSection
              key={category.categoryName}
              categoryName={category.categoryName}
              title={category.title}
              showButton={category.showButton}
            />
          );
        })}
      </div>
    </div>
  );
}

import { MovieSection } from "./_components/MovieSection";
import { categories } from "./_constant";
export default function Home() {
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

"use client";

import { MovieSection } from "@/app/_components/MovieSection";
import { categories } from "@/app/_constant";
import { use } from "react";

const CategorySectionDetail = ({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) => {
  const { categoryName } = use(params);

  const title = categories.find(
    (el) => el.categoryName === categoryName
  )?.title;

  return (
    <div className="flex justify-center">
      <MovieSection
        categoryName={categoryName}
        title={title}
        showButton={false}
      />
    </div>
  );
};

export default CategorySectionDetail;

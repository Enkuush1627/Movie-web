"use client";

import { MovieSection } from "@/app/_components/MovieSection";
import { use } from "react";

const CategorySectionDetail = ({
  params,
}: {
  params: Promise<{ categoryName: string }>;
}) => {
  const { categoryName } = use(params);

  return (
    <div className=" gap-96 bg-red-200">
      <MovieSection
        categoryName={categoryName}
        title={categoryName}
        showButton={false}
      />
    </div>
  );
};

export default CategorySectionDetail;
import { Suspense } from "react";
import GenreClient from "./_components/GenreClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
      <GenreClient />
    </Suspense>
  );
}

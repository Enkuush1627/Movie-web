"use client";

import { useEffect, useState } from "react";

type Cast = {
  id: number;
  name: string;
  character: string;
};

type Crew = {
  id: number;
  name: string;
  job: string;
};

type Props = {
  movieId: string;
};

export default function MovieCredits({ movieId }: Props) {
  const [cast, setCast] = useState<Cast[]>([]);
  const [crew, setCrew] = useState<Crew[]>([]);

  useEffect(() => {
    const fetchCredits = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        },
      );

      const data = await res.json();
      setCast(data.cast ?? []);
      setCrew(data.crew ?? []);
    };

    fetchCredits();
  }, [movieId]);

  const director = crew.find((c) => c.job === "Director");
  const writers = crew.filter(
    (c) => c.job === "Writer" || c.job === "Screenplay",
  );

  return (
    <section className="max-w-[1200px] w-full mt-10 space-y-2">
      <div className="space-y-2 text-sm">
        {director && (
          <p className="flex gap-[53px] items-center border-b py-2">
            <span className="font-bold text-base text-[#09090B] dark:text-white">
              Director
            </span>{" "}
            <span className="text-muted-foreground">{director.name}</span>
          </p>
        )}

        {writers.length > 0 && (
          <p className="flex gap-[58px] items-center border-b py-2">
            <span className="font-bold text-base text-[#09090B] dark:text-white">
              Writers
            </span>{" "}
            <span className="text-muted-foreground">
              {writers.map((w) => w.name).join(" · ")}
            </span>
          </p>
        )}
      </div>

      <div className="flex gap-[74px] items-center border-b py-2">
        <h3 className="font-bold text-base text-[#09090B] dark:text-white">
          Stars
        </h3>

        <div className="flex gap-2 text-sm">
          {cast.slice(0, 5).map((actor) => (
            <span key={actor.id} className="text-muted-foreground">
              {actor.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

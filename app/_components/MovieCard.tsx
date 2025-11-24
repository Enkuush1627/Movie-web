import { Star } from "lucide-react";
import Link from "next/link";
import { MovieImage } from "./MovieImage";

type MovieCardProps = {
  id: number;
  backdrop_path?: string;
  title: string;
  vote_average: string;
  className?: string;
};

export const MovieCard = ({
  id,
  backdrop_path,
  title,
  vote_average,
}: MovieCardProps) => {
  return (
    <Link rel="preload" href={`/movie/${id}`}>
      <div key={id} className="rounded-lg overflow-hidden">
        <MovieImage
          backdrop_path={backdrop_path}
          title={title}
          className="aspect-2/3"
        />
        <div className="p-3 bg-muted h-27">
          <div className="flex gap-1 items-center">
            <Star size={18} strokeWidth={0} fill="#FDE047" />
            <p className="text-sm pb-1">
              {vote_average}{" "}
              <span className="text-xs text-muted-foreground">/10</span>
            </p>
          </div>
          <p className="text-lg">{title}</p>
        </div>
      </div>
    </Link>
  );
};
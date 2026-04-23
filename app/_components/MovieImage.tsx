"use client";

import Image from "next/image";
import { useState } from "react";

type MovieImageProps = {
  poster_path?: string | null;
  title: string;
  className?: string;
  loading?: boolean;
};

export const MovieImage = ({
  poster_path,
  title,
  className = "",
  loading,
}: MovieImageProps) => {
  const fallback = "/placeholder.png";

  const [src, setSrc] = useState(
    poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : fallback,
  );

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        loading...
      </div>
    );
  }

  return (
    <Image
      src={src}
      width={500}
      height={750}
      alt={title}
      className={className}
      style={{ objectFit: "cover" }}
      onError={() => setSrc(fallback)}
    />
  );
};

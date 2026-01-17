import Image from "next/image";

type MovieImageProps = {
  poster_path?: string;
  title: string;
  className: string;
  loading?: boolean;
};

export const MovieImage = ({
  poster_path,
  title,
  className,
  loading,
}: MovieImageProps) => {
  const imgUrl = `https://image.tmdb.org/t/p/original${poster_path}`;
  const img = poster_path ? imgUrl : "/image.png";

  if (loading) return <>loaidng....</>;

  return (
    <Image
      src={img}
      width={500}
      height={500}
      alt={title}
      className={className}
      style={{ objectFit: "cover" }}
      loading="eager"
    />
  );
};

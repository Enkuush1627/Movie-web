import Image from "next/image";

type MovieImageProps = {
  backdrop_path?: string;
  title: string;
  className: string;
  loading?: boolean;
};

export const MovieImage = ({
  backdrop_path,
  title,
  className,
  loading,
}: MovieImageProps) => {
  const imgUrl = `https://api.themoviedb.org/3/original${backdrop_path}`;
  const img = backdrop_path ? imgUrl : "/image.png";

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
export const getImage = (path?: string | null) => {
  if (!path) return "/placeholder.png";

  return `https://image.tmdb.org/t/p/original${path}`;
};

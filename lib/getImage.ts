export const getImage = (
  path?: string | null,
  type: "poster" | "backdrop" = "poster",
) => {
  if (!path) {
    return type === "backdrop"
      ? "https://via.placeholder.com/1280x720?text=No+Image"
      : "https://via.placeholder.com/500x750?text=No+Image";
  }

  const size = type === "backdrop" ? "w1280" : "w500";

  return `https://image.tmdb.org/t/p/${size}${path}`;
};

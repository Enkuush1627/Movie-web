// "use client";

// import { useEffect, useState } from "react";

// type Props = {
//   movieId: string;
// };

// export const MovieIdHeader = ({ movieId }: Props) => {
//   const [movie, setMovie] = useState<MovieDetail | null>(null);

//   useEffect(() => {
//     const fetchMovie = async () => {
//       const res = await fetch(
//         `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
//           },
//         }
//       );

//       const data = await res.json();
//       setMovie(data);
//     };

//     fetchMovie();
//   }, [movieId]);

//   if (!movie) return null;

//   return (
//     <section className="max-w-[1200px] w-full px-6 mt-10">
//       {/* Title + Meta */}
//       <div className="flex justify-between items-start">
//         <div>
//           <h1 className="text-4xl font-bold">{movie.title}</h1>

//           <p className="text-sm text-muted-foreground mt-2">
//             {movie.release_date?.slice(0, 4)} ·{" "}
//             {movie.runtime ? `${movie.runtime} min` : "—"}
//           </p>

//           <div className="flex gap-2 mt-4 flex-wrap">
//             {movie.genres?.map((genre) => (
//               <span
//                 key={genre.id}
//                 className="px-3 py-1 rounded-full border text-xs font-medium"
//               >
//                 {genre.name}
//               </span>
//             ))}
//           </div>
//         </div>

//         <div className="text-right">
//           <p className="text-sm text-muted-foreground">Rating</p>
//           <p className="text-lg font-semibold">
//             ⭐ {movie?.vote_average?.toFixed(1)}/ 10
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

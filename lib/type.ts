type MovieDetail = {
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  vote_count: string;
  title: string;
  overview: string;
  id: number;
  release_date: string;
  runtime: number;
  genres: {
    id: number;
    name: string;
  }[];
};

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

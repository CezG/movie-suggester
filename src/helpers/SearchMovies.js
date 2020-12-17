import groupMovies from "./groupMovies.json";

const searchMovies = () => {
  const mainPerson = groupMovies.groupMovies[0].movies.map((movie, id) => {
    return { movieId: id, title: movie.movieTitle, score: movie.score };
  });
  let mainPersonMovies = mainPerson.map((movie) => movie.title);

  let restGroup = groupMovies.groupMovies.slice(1);
  let group = restGroup.map((group) => group.movies);
  const moviesGroup = group.map((moviesPerson, id) => {
    return {
      personId: id,
      movies: moviesPerson.map((movie, id) => {
        return {
          movieId: id,
          title: movie.movieTitle,
          score: movie.score,
        };
      }),
    };
  });

  let matchedMovies = moviesGroup
    .map((group, id) => {
      return {
        ...group,
        movies: group.movies.filter((movie) =>
          mainPersonMovies.includes(movie.title)
        ),
      };
    })
    .filter((arrays) => arrays.movies.length);

  let cos3 = matchedMovies.map((moviesPerson) => ({
    personId: moviesPerson.personId,
    movies: moviesPerson.movies.map((movie) => ({
      ...movie,
      delta:
        parseInt(
          mainPerson.find((mainMovie) =>
            mainMovie.title === movie.title ? mainMovie.score : ""
          ).score
        ) - movie.score,
    })),
  }));

  return cos3;
};

export default searchMovies;

import groupMovies from "./groupMovies.json";

const searchMovies = () => {
  const mainPerson = groupMovies.groupMovies[0].movies.map((movie, id) => {
    return { movieId: id, title: movie.movieTitle, score: movie.score };
  });
  const mainPersonMovies = mainPerson.map((movie) => movie.title);

  const restGroup = groupMovies.groupMovies.slice(1);
  const group = restGroup.map((group) => group.movies);
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

  const matchedMovies = moviesGroup
    .map((group) => {
      return {
        ...group,
        movies: group.movies.filter((movie) =>
          mainPersonMovies.includes(movie.title)
        ),
      };
    })
    .filter((arrays) => arrays.movies.length);

  const matchedMoviesWithDelta = matchedMovies.map((moviesPerson) => ({
    personId: moviesPerson.personId,
    movies: moviesPerson.movies.map((movie) => ({
      ...movie,
      delta: Math.abs(
        parseInt(
          mainPerson.find((mainMovie) =>
            mainMovie.title === movie.title ? mainMovie.score : ""
          ).score
        ) - movie.score
      ),
    })),
  }));

  const sum = (deltas) => {
    return deltas.reduce((a, b) => a + b, 0);
  };

  const calculateMatchPerons = matchedMoviesWithDelta.map((moviesPerson) => ({
    ...moviesPerson,
    sum: sum(moviesPerson.movies.map((score) => score.delta)),
    similiarMovies: moviesPerson.movies.length,
    average:
      sum(moviesPerson.movies.map((score) => score.delta)) /
      moviesPerson.movies.length,
  }));

  const mostSimiliarPersons = calculateMatchPerons.filter(
    (person) => person.average <= 1.45 && person.similiarMovies >= 3
  );

  const mostSimiliarPersonsId = mostSimiliarPersons.map(
    (person) => person.personId
  );

  const bestMoviesSimiliarPersons = moviesGroup
    .filter((person) => mostSimiliarPersonsId.includes(person.personId))
    .map((person) => ({
      ...person,
      movies: person.movies.filter(
        (movie) => !mainPersonMovies.includes(movie.title) && movie.score >= 9
      ),
    }));

  const bestMoviesArrays = bestMoviesSimiliarPersons.map((person) =>
    person.movies.map((movie) => movie.title)
  );

  const bestMoviesArray = [].concat.apply([], bestMoviesArrays).sort();

  let bestMoviesWithoutDuplicates = [...new Set(bestMoviesArray)];

  return {
    bestMoviesWithoutDuplicates,
  };
};

export default searchMovies;

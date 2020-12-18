import { groupMovies } from "./groupMovies.json";

const FindBySimilarPersons = () => {
    const mainPersonMovies = groupMovies[0].movies;
    let sameData = [];
    let similarityData = [];
    let recommendations = [];

    const findSameMovies = person => {
      let clearData = [];

      const sameMovies = mainPersonMovies.map(movie => (
          person.movies.filter((item => item.movieTitle === movie.movieTitle))
      ));

      sameMovies.forEach(movie => {
            if (movie.length > 0) {
                clearData.push({person: person.person, movie: movie})
            }
        })
        if (clearData.length > 0) {
            sameData.push({person: person.person, movies: clearData})
        }
    };

    const getMainPersonScore = movieTitle => {
        return mainPersonMovies.filter(item => item.movieTitle === movieTitle)[0].score
    }

    const personSimilarity = person => {
        let similarity = 0;
        person.movies.forEach(personMovie => {
            let mainScore = parseInt(getMainPersonScore(personMovie.movie[0].movieTitle));
            let personScore = parseInt(personMovie.movie[0].score);
                    if (mainScore + 1 === personScore || mainScore === personScore || mainScore -1 === personScore){
                        similarity += 1
                    }
                    else similarity -= 1

            })
        similarityData.push({person: person.person, similarity: similarity});
    }

    const getPersonalRecommendations = person => {
        let personsSimilar;
        if (person.similarity >= 3) {
            sameData.forEach(data => {
                if ( data.person === person.person) {
                    personsSimilar = data.movies
                }
            })

            groupMovies.forEach(groupPerson => {

                if ( groupPerson.person === person.person) {
                    groupPerson.movies.forEach(groupPersonMovie => {
                        let addMovie = true;
                        personsSimilar.forEach(groupPersonSimilarMovie =>{
                            if (groupPersonMovie.movieTitle === groupPersonSimilarMovie.movie[0].movieTitle)
                                addMovie = false
                        })
                        if (groupPersonMovie.score >= 9 && addMovie) {
                            recommendations.push(groupPersonMovie.movieTitle)
                        }
                    })
                }
            })
        }
    }


    groupMovies.forEach((person,index) => {
        index > 0 && findSameMovies(person)
    })

    sameData.forEach(data => personSimilarity(data));

    similarityData.forEach(data => getPersonalRecommendations(data));

    return recommendations

}

export default FindBySimilarPersons
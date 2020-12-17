import groupMovies from "./groupMovies.json";

const searchMovies = () => {
    let mainPerson = groupMovies.groupMovies[0];
    let mainPersonMovies = mainPerson.movies.map(movie =>movie.movieTitle);
    let restGroup = groupMovies.groupMovies.slice(1);

    let group= restGroup.map((group)=> group.movies);
    let moviesGroup =group.map(moviesPerson=> moviesPerson.map(movie =>movie.movieTitle));
    
    let booleanTable= moviesGroup.map( (person )=> person.map((movie, index )=> mainPersonMovies.includes(movie)));
   
    let personsAndMovies = booleanTable.map((movies, index )=> 
        {return {"personId":index, "movies": movies.map((movie,index)=> 
        {return{"movieId":index,"movie": movie}}).filter(movie=> movie.movie ) } }); 
    
    return personsAndMovies;

}


const check = (booleanTable,index ) =>{
    
  

}

export default searchMovies;
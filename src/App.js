import './App.css';
import movies from './helpers/SearchMovies'
import FindBySimilarPersons from "./helpers/FindBySimilarPersons";

function App() {
  console.log(movies());
  console.log(FindBySimilarPersons());
  return (
    <>
    </>
  );
}

export default App;

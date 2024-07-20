import withMovies from '../mocks/with-results.json'
import noMovies from '../mocks/no-results.json'
import { useState } from 'react'

export function useMovies({ search }) {
  const [responseMovies, setResponseMovies] = useState([]);
  const movies = responseMovies.Search

  const mappedMovies = movies?.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster
  }))

  const getMovies = () => {
    if (search) {
      setResponseMovies(withMovies)
    } else {
      setResponseMovies(noMovies)
    }
  }

  return { movies: mappedMovies, getMovies } //Devuelvo getMovies para llamar la función cuando se requiera
} //Exporta el mapeo de atributos de objetos pertenecientes al json de la pelicula buscada

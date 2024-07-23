//import withMovies from '../mocks/with-results.json'
import noMovies from '../mocks/no-results.json'
import searchMovies from '../services/movies'
//import movies 
import { useEffect, useRef, useState } from 'react'

export function useMovies({ search }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Utilizamos un useRef para guardar la búsqueda anterior
  const previousSearch = useRef(search)

  //De esta manera, seteamos el estado según el valor del search
  const getMovies = async () => { // Si la función que llama es asíncrona, entonces esta también debe serlo
    if (previousSearch.current === search) return
    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const responseMovies = await searchMovies({ search })
      setMovies(responseMovies)
    } catch (error) {
      setError(error.message)
    } finally { //Se ejecuta tanto en el try como en el catch, entonces siempre que termine de ejecutarse el cuerpo de uno de estos el loading se setea en false
      setLoading(false)
    }
  }

  return { movies, getMovies, loading } //Devuelvo getMovies para llamar la función cuando se requiera
} //Exporta el mapeo de atributos de objetos pertenecientes al json de la pelicula buscada

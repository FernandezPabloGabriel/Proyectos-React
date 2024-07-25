//import withMovies from '../mocks/with-results.json'
import noMovies from '../mocks/no-results.json'
import searchMovies from '../services/movies'
//import movies 
import { useEffect, useRef, useState, useMemo } from 'react'

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Utilizamos un useRef para guardar la búsqueda anterior
  const previousSearch = useRef(search)

  //De esta manera, seteamos el estado según el valor del search
  const getMovies = useMemo(() => { //También funciona con funciones el useMemo
    console.log("getMovies render")
    return async ({ search }) => { // Si la función que llama es asíncrona, entonces esta también debe serlo
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
  }, [])


  //De esta manera se llama a la función cada vez que se re-renderiza la app, por lo que no es mu conveniente
  // const sortedMovies = sort ?
  //   [...movies].sort((a, b) => a.title.localeCompare(b.title)) //Utilizamos localeCompare para comparar acentos
  //   : movies

  //con useMemo
  const sortedMovies = useMemo(() => {
    console.log("Hola")
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  //No funciona con useEffect, ya que ejecuta efectos en lugar de guardar valores
  // useEffect(() => {
  //   const sortedMovies = sort
  //     ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
  //     : movies
  //   setMovies(sortedMovies)
  //   console.log()
  // }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading } //Devuelvo getMovies para llamar la función cuando se requiera
} //Exporta el mapeo de atributos de objetos pertenecientes al json de la pelicula buscada

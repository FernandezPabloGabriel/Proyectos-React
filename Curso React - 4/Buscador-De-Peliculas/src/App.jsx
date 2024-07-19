import './App.css'
import responseMovies from './mocks/with-results.json'
import noResults from './mocks/no-results.json'
import { useState } from 'react'
import { useEffect } from 'react'


export default function App() {

  // const [hasMovies, setHasMovies] = useState
  // const [movies, setMovies] = useState

  // async function fetchMovies() {
  //   const moviesA = await responseMovies('avengers')
  //   const hasMoviesA = movies?.length > 0 //opcional
  //   console.log(movies.length)
  //   console.log(movies)
  //   setHasMovies(hasMoviesA)
  //   setMovies(moviesA)
  // }

  // useEffect(() => {
  //   fetchMovies()
  // }, [])

  const movies = responseMovies.Search
  const hasMovies = movies?.length > 0 //opcional

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
        <div>
          <form className='form'>
            <input placeholder='Pelicula a buscar...' /> {/* Por defecto es text */}
            <button type='submit'>Buscar</button>
          </form>
        </div>
      </header>

      <main>
        {
          hasMovies
            ? (
              <ul>
                {
                  movies.map(movie => (
                    <li key={movie.imdbID}>
                      <h3>{movie.Title}</h3>
                      <p>{movie.Year}</p>
                      <img src={movie.Poster} alt={movie.Title}></img>
                    </li>
                  ))
                }
              </ul>
            )
            : (
              <p>No se encontraron películas para esta búsqueda</p>
            )
        }
      </main>
    </div>
  )
}


import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'




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

  const { movies } = useMovies()
  const inputRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    const inputEl = inputRef.current //current es una propiedad nativa de JS que permite obtener el valor actual del objeto
    const value = inputEl.value //El value de ese objeto es lo que utilizaremos
    console.log(value)
  }


  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
        <div>
          <form className='form' onSubmit={handleSubmit}>
            <input ref={inputRef} placeholder='Pelicula a buscar...' /> {/* Por defecto es text */}
            <button type='submit'>Buscar</button>
          </form>
        </div>
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}


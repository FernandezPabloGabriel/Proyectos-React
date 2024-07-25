import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useCallback } from 'react'
import debounce from 'just-debounce-it'

function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setErrors] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setErrors('No se puede buscar una película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setErrors('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setErrors('La búsqueda debe tener al menos 3 carácteres')
      return
    }

    setErrors(null)
  }, [search])

  return { error, search, updateSearch }
}

export default function App() {
  const [sort, setSort] = useState(false) //Estado para ver indicar si se ordenan o no las películas
  const { error, search, updateSearch } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort }) //Cada vez que se actualiza el search, va a cambiar el parámetro del useMovies

  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log("Rararararara")
      getMovies({ search })
    }, 300)
    , []
  )

  //const inputRef = useRef()

  //Utilizando vanilla JS, permite muuucha reutilización, como la posibilidad de usar 10 inputs
  const handleSubmit = (event) => {
    event.preventDefault() //Evita que la página se recargue
    //const { search } = Object.fromEntries(new window.FormData(event.target)) //De esta manera recolectamos 
    //const { search } = fields.get('search')
    getMovies({ search })
  }

  //Esta función se encarga de manejar el estado del formulario cada vez que cambia el input
  //Actualiza el estado search por medio del customHook useSearch cada vez que cambia el input
  const handleChange = (event) => {
    const newSearch = event.target.value
    if (newSearch !== ' ') {
      updateSearch(newSearch)
      //getMovies({ search: newSearch })
      debouncedGetMovies(newSearch)
    }
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
        <div>
          <form className='form' onSubmit={handleSubmit}>
            <input style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }} onChange={handleChange}
              value={search}
              name='search'
              placeholder='Pelicula a buscar...' /> {/* Por defecto es text ||| value={search} */}
            <button type='submit'>Buscar</button>
            <div>
              <label htmlFor="">Ordenar</label>
              <input type='checkbox' onChange={handleSort} checked={sort} />
            </div>
          </form>
          {error && <p className='error'>{error}</p>}
        </div>
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}


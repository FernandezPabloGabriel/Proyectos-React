import '../App.css'

function ListOfMovies({ movies }) { //PropTypes
  //Este componente está muy vinculado o atado a como funciona la API, si esta cambia nuestro componente también y ocasionaría errores
  //Además está en la parte de la UI
  return (
    <ul className='movies'>
      {
        movies.map(movie => (
          <li className='movie' key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.poster} alt={movie.title}></img>
          </li>
        ))
      }
    </ul>
  )
}

function NoMoviesResults() {
  return (
    <p>No se encontraron películas para esta búsqueda</p>
  )
}

//En lugar de exportar los componentes podemos exportar la pequeña terna que los incluye

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0

  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoMoviesResults />
  )
}
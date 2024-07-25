const API_KEY = '4287ad07'

const searchMovies = async ({ search }) => {
  if (search === '') return null
  try {
    // return (fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    //   .then(res => res.json()))
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    const json = await response.json()

    const movies = json.Search
    // Mapeado de tal manera que no depende el "mappedMovies" de como es la estructura del json
    return movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
  } catch (e) {
    throw new Error('Error al buscar las películas')
  }
}

export default searchMovies
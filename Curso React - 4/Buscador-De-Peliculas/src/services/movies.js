export const searchMovies = async({})
if (search) { //Si hay valor no nulo...
  //setResponseMovies(withMovies)
  fetch(`https://www.omdbapi.com/?apikey=4287ad07&s=${search}`)
    .then(res => res.json())
    .then(json => setResponseMovies(json))
} else {
  setResponseMovies(noMovies)
}

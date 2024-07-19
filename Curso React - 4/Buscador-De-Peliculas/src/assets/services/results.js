const URL_MOVIES = 'https://www.omdbapi.com/?apikey=4287ad07&s='

export const responseMovies = async (movie) => {
  const res = await fetch(URL_MOVIES + movie)
  const response = await res.json()
  console.log(response)
  const { Search } = response
  //console.log(movies)
  return Search
}

// export const responseMovies = (movie) => {
//   return fetch(URL_MOVIES + movie)
//     .then(res => res.json())
//     .then(movies => movies.Search)
// }
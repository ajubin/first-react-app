const API_TOKEN = "3e5e5dadeac41d18c3c5ba641465706a";

export function getFilmsFromApiWithQuery(query, page) {
  const url =
    "https://api.themoviedb.org/3/search/movie?language=fr&api_key=" +
    API_TOKEN +
    "&page=" +
    page +
    "&query=" +
    query;
  return fetch(url)
    .then(res => res.json())
    .catch(err => {
      console.error(err);
    });
}

export function getImageFromApi(name) {
  return "https://image.tmdb.org/t/p/w300" + name;
}

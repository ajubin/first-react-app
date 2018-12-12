const API_TOKEN = "3e5e5dadeac41d18c3c5ba641465706a";

export function getFilmsFromApiWithQuery(query) {
  const url =
    "https://api.themoviedb.org/3/search/movie?language=fr&api_key=" +
    API_TOKEN +
    "&query=" +
    query;
  return fetch(url)
    .then(res => res.json())
    .catch(err => {
      console.error(err);
    });
}

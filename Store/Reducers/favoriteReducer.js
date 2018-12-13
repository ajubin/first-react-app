const initialState = { favoritesFilm: [] };

function toggleFavorite(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      const favoriteFilmIndex = state.favoritesFilm.findIndex(
        item => item.id === action.value.id
      );
      if (favoriteFilmIndex !== -1) {
        // Film déja dans les favoris ? on le supprime

        // perso: le state est immuable, on en fait une copie avant de l'altérer
        nextState = {
          ...state,
          favoritesFilm: state.favoritesFilm.filter(
            (item, index) => index !== favoriteFilmIndex
          )
        };
      } else {
        // On l'ajoute sinon
        nextState = {
          ...state,
          favoritesFilm: [...state.favoritesFilm, action.value]
        };
      }
      // perso: sécurité si nextState est undefined
      return nextState || state;
    default:
      return state;
  }
}

export default toggleFavorite;

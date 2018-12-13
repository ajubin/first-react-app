const initialState = {
  historicFilms: []
};

function manageHistoricFilms(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "TOGGLE_FILMDETAIL":
      const historicFilmIndex = state.historicFilms.findIndex(
        item => item.id === action.value.id
      );
      if (historicFilmIndex === -1) {
        // film pas dans l'historique, le rajouter
        nextState = {
          ...state,
          historicFilms: [...state.historicFilms, action.value]
        };
      } else {
        // film dans l'historique, on le laisse
        nextState = {
          ...state
        };
      }
      return nextState || state;

    case "REMOVE_HISTORIC_FILM":
      nextState = {
        ...state,
        historicFilms: state.historicFilms.filter(
          item => item.id !== action.value.id
        )
      };
      return nextState || state;

    case "RESET_HISTORIC":
      nextState = {
        ...state,
        historicFilms: []
      };
      return nextState || state;
    default:
      return state;
  }
}

export default manageHistoricFilms;

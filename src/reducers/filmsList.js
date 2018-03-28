import {
  FETCH_FILMS,
  ADD_FILM,
  ADD_FILMS,
  DELETE_FILM,
  SEARCH_FILM,
  CHANGE_SORTING_ORDER
} from '../constants/ActionTypes';

const changeSortingOrder = sortingOrder => sortingOrder === 'asc' ? 'desc' : 'asc';

const initialState = {
  allFilms: [],
  stringToSearch: '',
  sortingOrder: 'asc'
};


export default function filmsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FILMS: {
      return {
        ...state,
        allFilms: action.films
      };
    }
    case ADD_FILM: {
      return {
        ...state,
        allFilms: [...state.allFilms, action.film]
      };
    }
    case ADD_FILMS: {
      return {
        ...state,
        allFilms: [...state.allFilms, ...action.films]
      };
    }
    case DELETE_FILM: {
      return {
        ...state,
        allFilms: [...state.allFilms.filter((film) => film._id !== action.film_id)]
      };
    }
    case SEARCH_FILM: {
      return {
        ...state,
        stringToSearch: action.stringToSearch.toLowerCase()
      };
    }
    case CHANGE_SORTING_ORDER: {
      return {
        ...state,
        sortingOrder: changeSortingOrder(state.sortingOrder),
      };
    }
    default:
      return state;
  }
}

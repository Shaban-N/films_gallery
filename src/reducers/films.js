import { FETCH_FILMS, ADD_FILM , SHOW_FILM_INFO, DELETE_FILM,SEARCH_FILM,CHANGE_SORTING_ORDER} from '../constants/ActionTypes';

const changeSortingOrder = sortingOrder => sortingOrder === "asc" ? "desc": "asc";

const initialState = {
  allFilms: [],
  searchedFilms: [],
  sortingOrder: "asc"
}



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
        allFilms: [...state.allFilms, action.newFilm]
      };
    }
    case DELETE_FILM: {
      return {
        ...state,
        allFilms: [...state.allFilms.filter((film)=>film._id != action.film_id)]
      };
    }
    case SEARCH_FILM: {
      return {
        ...state,
        searchedFilms: [...state.allFilms.filter( film =>{
        return film.title.indexOf(action.stringToSearch)!=-1 || film.stars.indexOf(action.stringToSearch)!=-1})]
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

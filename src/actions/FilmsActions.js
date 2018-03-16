import { FETCH_FILMS, ADD_FILM , SHOW_FILM_INFO, DELETE_FILM,SEARCH_FILM,CHANGE_SORTING_ORDER} from '../constants/ActionTypes';

export const fetchFilms = () => {
  return async (dispatch)=> {
    const fetches = await fetch('/api/films')
      .then(result => result.json());
    dispatch(fetchFilmsData(fetches));
    console.log("get data");
  }
};

const fetchFilmsData = (films) => ({
    type: FETCH_FILMS,
    films
})
export const deleteFilm = (film_id) => ({
  type: DELETE_FILM,
  film_id
})
export const showFilmInfo = (film_id) => ({
  type: SHOW_FILM_INFO,
  film_id
})


export const  addNewFilm = (newFilm) => ({
    type: ADD_FILM,
    newFilm
})

export const  searchFilm = (stringToSearch) => ({
  type: SEARCH_FILM,
  stringToSearch
})

export const  changeSortingOrder = () => ({
  type: CHANGE_SORTING_ORDER,
})
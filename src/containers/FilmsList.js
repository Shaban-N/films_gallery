import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { fetchFilms, searchFilm, changeSortingOrder, addFilms } from '../actions/FilmsActions'
import Film from '../components/Film'
import AddFilm from '../components/AddFilm'
import { getParsedFilms } from '../utils/getData'
import { filmsComparator } from '../utils/comparator'

const getSearchedFilms = (allFilms, stringToSearch) => {
  return allFilms.filter(film => {
    let searchedByActor = false;
    let searchedByTitle = film.title.toLowerCase().indexOf(stringToSearch) === 0
    const starsArr = film.stars.split(',');
    starsArr.forEach( i => {
      if (i.trim().toLowerCase().indexOf(stringToSearch)===0) {
        searchedByActor = true
      }
    })
    return searchedByTitle || searchedByActor
  })
};

const mapStateToProps = state => ({
  films: getSearchedFilms(state.films.allFilms, state.films.stringToSearch),
  sortingOrder: state.films.sortingOrder
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(fetchFilms()),
  searchFilm: stringToSearch => dispatch(searchFilm(stringToSearch)),
  onSortClick: () => dispatch(changeSortingOrder()),
  addFilms: films => dispatch(addFilms(films))
});

export class FilmsList extends Component {
  state = {
    isAddFilmModalOpened: false,
  };

  componentDidMount() {
    this.props.fetchData()
  }

  handleSearchChange = val => this.props.searchFilm(val);

  renderFilms = () => {
    const { films, sortingOrder } = this.props;
    const sortedFilms = films.concat().sort(filmsComparator(sortingOrder));
    return (
      <ul>
        {sortedFilms.map(film =>
          <li key={film._id}>
            <Film id={film._id}
                  title={film.title}
                  release={film.release}
                  format={film.format}
                  stars={film.stars}/>
          </li>)}
      </ul>)
  };

  toggleAddFilmModal = () => this.setState({ isAddFilmModalOpened: !this.state.isAddFilmModalOpened });

  handleAddFilm = (e) => {
    const { fetchData } = this.props;
    getParsedFilms(e).then(films => {
      fetch('/api/films', {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(films)
      }).then(fetchData())
    })
  };

  render() {
    const { onSortClick } = this.props;
    return (
      <div className='main-app-container'>
        <header>
          <div className='bunner'>
            Films gallery
          </div>
          <input type='text'
                 className='search__input'
                 placeholder='Type title or actor'
                 onChange={(e) => this.handleSearchChange(e.target.value)}/>
        </header>

        <div className='nav-container'>
          <label className='button choose-file__button-container'>
            Import File
            <input type='file'
                   accept='text/plain'
                   onChange={this.handleAddFilm}
                   className='choose-file__button'/>
          </label>
          <button onClick={this.toggleAddFilmModal}
                  className='button'>
            Add film
          </button>
          {this.state.isAddFilmModalOpened && <ModalContainer onClose={this.toggleAddFilmModal}>
            <ModalDialog onClose={this.toggleAddFilmModal}>
              <AddFilm toggleAddFilmModal={this.toggleAddFilmModal}/>
            </ModalDialog>
          </ModalContainer>}
        </div>

        <div className="sort-button_wrapper">
          <button onClick={onSortClick}
                  className='button'>
            Sort by name
          </button>
        </div>

        <div className='list-item_wrapper'>
          {this.renderFilms()}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmsList);

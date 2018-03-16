import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchFilms, searchFilm, changeSortingOrder } from '../actions/FilmsActions'
import { deleteFilm } from '../actions/FilmsActions'
import Film from '../components/Film'


function getDataFromFile(event) {
  const input = event.target;
  const reader = new FileReader();
  reader.onload = function () {
    const text = reader.result;
    const splitted = text.split("\n");
    let resultData = [];
    let start_index = 0;
    splitted.forEach((item, index) => {
      if (item == "") {
        let obj = {};
        let arrayOfProprties = splitted.slice(start_index, index);
        arrayOfProprties.map(property => {
          if (property.includes("Title:")) (obj.title = property.slice(7));
          if (property.includes("Release Year:")) (obj.release = property.slice(14));
          if (property.includes("Format:")) (obj.format = property.slice(8));
          if (property.includes("Stars:")) (obj.stars = property.slice(7));
        })
        start_index = index + 1;
        resultData.push(obj)
      }
    })
    resultData.forEach(data =>
      fetch('/api/films', {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
    )
  };
  reader.readAsText(input.files[0]);
};

const filmsComparator = sortingOrder => (a, b) => {
  const multiplier = sortingOrder === 'asc' ? 1 : -1;

  if (a.title > b.title) {
    return multiplier
  }

  else if (a.title < b.title) {
    return -multiplier
  }

  return 0
}

const mapStateToProps = (state) => ({
  films: state.films.allFilms,
  sortingOrder: state.films.sortingOrder
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchFilms()),
  searchFilm: (stringToSearch) => dispatch(searchFilm(stringToSearch)),
  onSortClick: () => dispatch(changeSortingOrder())

});

class App extends Component {

  componentDidMount() {
    this.props.fetchData()
  }

  handleSearchChange = val => {
    this.props.searchFilm(val)
  }

  renderFilms = () => {
    const { films, sortingOrder } = this.props;
    const sortedFilms = films.concat().sort(filmsComparator(sortingOrder))
    return (
      <ul>
        {sortedFilms.map(film =>
          <li key={film._id}>
            <Film id={film._id} title={film.title}/>
          </li>)}
      </ul>)
  }

  render() {
    const { onSortClick } = this.props;

    return (
      <div className="main-app-container">
        <input type='file' accept='text/plain' onChange={getDataFromFile}/>
        <input onChange={(e) => this.handleSearchChange(e.target.value)}/>
        <input type="button" onClick={onSortClick} value='Sort by name'/>
        <div className="main-app-nav">Films gallery</div>
        {this.renderFilms()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

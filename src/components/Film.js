import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteFilm } from '../actions/FilmsActions'

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchFilms()),
  deleteData: (id) => dispatch(deleteFilm(id))
});

export class Film extends Component {
  state = {
    isInfoOpened:false,
  };

  onDeleteFilm = id =>
    fetch(`/api/films/${id}`, { method: 'delete' })
      .then(this.props.deleteData(id));

  toogleInfoOpened = () => {
    this.setState({isInfoOpened: !this.state.isInfoOpened});
  };

  onCloseInfo = () => {
    this.setState({isInfoOpened: false})
  };


  render() {
  const {format, release, stars,title,id } = this.props;
    return (
      <div className=''>
        <div className='inline-item'>
          <div className='film-title'>
            {title}
          </div>
          <button
            className='button remove__button'
            onClick={() => this.onDeleteFilm(id)}>
              Remove this film
          </button>
          <button
            className='button info__button'
            onClick={this.toogleInfoOpened}>
              Info
          </button>
        </div>
        {this.state.isInfoOpened &&
            <div className='info_wrapper'>
              <div className='item_info'>
                <p><span className="bold">Release year:</span> {release}</p>
              </div>
              <div className='item_info'>
                <p><span className="bold">Format:</span> {format} </p>
              </div>
              <div className='item_info'>
                <p><span className="bold">Actors:</span> {stars} </p>
              </div>
            <button
              className='button'
              onClick={() => this.onCloseInfo(id)}>
                Hide
            </button>
          </div>
        }
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Film);

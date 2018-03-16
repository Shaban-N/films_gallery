import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteFilm } from '../actions/FilmsActions'

const  mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchFilms()),
  deleteData: (id) => dispatch(deleteFilm(id))
});

class Film extends Component {
  state = {
    isInfoShow:false,
    info:{}
  }

  onDeleteFilm = (id) => {
    fetch(`/api/films/${id}`, { method: 'delete' }).then(this.props.deleteData(id));
  };

  fetchFilmInfo = (id) => {
    fetch(`/api/films/${id}`, { method: 'get' })
      .then(result => result.text())
      .then(data =>{
      console.log(data)
        this.setState({info: JSON.parse(data), isInfoShow: true})});
  };

  onCloseInfo = (id) => {
    this.setState({isInfoShow: false})
  };



  render() {
    return (
      <div className="">
        <div className="inline_item">
          <div>
            {this.props.title}
          </div>
          <button onClick={() => this.onDeleteFilm(this.props.id)}>Remove this film</button>
          <button onClick={() => this.fetchFilmInfo(this.props.id)}>Info</button>
        </div>
        {this.state.isInfoShow &&
          <div>
            <div className="">
              <div className="inline_item">
                <p>Release year: </p>
                <p>{this.state.info.release} </p>
              </div>
              <div className="inline_item">
                <p>Format: </p>
                <p>{this.state.info.format} </p>
              </div>
              <div className="inline_item">
                <p>Stars: </p>
                <p>{this.state.info.stars} </p>
              </div>

            </div>
            <button onClick={() => this.onCloseInfo(this.props.id)}> Close </button>
          </div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Film);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFilms } from '../actions/FilmsActions'

const mapDispatchToProps = dispatch => ({
  addFilms: films => dispatch(addFilms(films))
});

export class AddFilm extends Component {
  state = {
    title: '',
    format: '',
    year: '',
    stars: '',
    isFormValid: true
  };

  addFilm = () => {
    const { title, format, year, stars } = this.state;
    const {addFilms,toggleAddFilmModal}=this.props;
    const film={title:title, release:year, format:format, stars:stars };
    addFilms([film]);
    fetch('/api/films', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify([film])
    });
    toggleAddFilmModal();
  }

  onAddFilmClick = () =>{
    const { title, format, year, stars } = this.state;
    (title.trim() && format.trim() && year.trim() && stars.trim())
      ? this.addFilm()
      : this.setState({isFormValid: false})
  };

  onInputChange = e => this.setState({ [e.target.name]: e.target.value });

  render(){
    const { title, format, year, stars,isFormValid } = this.state;
    return(
      <div className="form_wrapper">
        <div>
          <div className='inline-item'>
            <label>Title: </label>
            <input
              required="required"
              className='form__input'
              type='text'
              name='title'
              value={title}
              onChange={this.onInputChange}
            />
          </div>
          <div className='inline-item'>
            <label>Format: </label>
            <input
              required="required"
              className='form__input'
              type='text'
              name='format'
              value={format}
              onChange={this.onInputChange}
            />
          </div>
          <div className='inline-item'>
            <label>Year: </label>
            <input
              className='form__input'
              type='text'
              name='year'
              value={year}
              onChange={this.onInputChange}
            />
          </div>
          <div className='inline-item '>
            <label>Stars: </label>
            <input
              className='form__input'
              type='text'
              name='stars'
              value={stars}
              onChange={this.onInputChange}
            />
          </div>
        </div>
          <input type='button'
                 value='Add film'
                 className='button'
                 onClick={this.onAddFilmClick} />
        {!isFormValid &&
          <p>Fill in all the fields</p>
        }
      </div>
    )
  }
}
export default connect(null, mapDispatchToProps)(AddFilm)
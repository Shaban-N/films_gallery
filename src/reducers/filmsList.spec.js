import React from 'react'
import expect from 'expect'
import { shallow, mount } from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-14';
import filmsReducer from './filmsList'
Enzyme.configure({ adapter: new Adapter() });

describe('AddFilm Component', () => {
  it('should add film', () => {
    const initialState ={
      allFilms: [],
      stringToSearch: '',
      sortingOrder: 'asc'
    };
    const action = {
      type: 'ADD_FILM',
      film:{
        id:1,
        title: 'title',
        format: 'format',
        release: 'release',
        stars: 'stars',
      }
    };
    const nextState = filmsReducer(initialState, action);
    expect(nextState).toEqual({
      allFilms: [
        {
          id:1,
          title: 'title',
          format: 'format',
          release: 'release',
          stars: 'stars'
        }
      ],
      stringToSearch: '',
      sortingOrder: 'asc'
    });
  });

  it('should delete film', () => {
    const initialState ={
      allFilms: [
        {
          id:1,
          title: 'title',
          format: 'format',
          release: 'release',
          stars: 'stars'
        }
      ],
      stringToSearch: '',
      sortingOrder: 'asc'
    };

    const action = {
      type: 'DELETE_FILM',
      film:
      {
        id:1,
        title: 'title',
        format: 'format',
        release: 'release',
        stars: 'stars',
      }
    };
    const nextState = filmsReducer(initialState, action);
    expect(nextState).toEqual({
      allFilms: [],
      stringToSearch: '',
      sortingOrder: 'asc'
    });
  })
})

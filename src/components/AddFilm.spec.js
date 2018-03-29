import React from 'react'
import expect from 'expect'
import { shallow, mount } from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-14';

Enzyme.configure({ adapter: new Adapter() });
import {AddFilm} from './AddFilm'

describe('AddFilm Component', () => {
  it('should have an inputs for add film', () => {
    const wrapper = shallow(<AddFilm />);
    expect(wrapper.find('input')).toHaveLength(5);
  })
  it('should button work', () => {
    const wrapper = shallow(<AddFilm />);
    const firstInput = wrapper.find('input').at(0);
    firstInput.simulate('change',{ target: {name:'title', value: 't' } })
    const button = wrapper.find('input').at(4);
    button.simulate('click');
    expect(wrapper.state().title).toEqual('t')
  })
})


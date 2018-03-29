import React from 'react'
import expect from 'expect'
import { shallow, mount } from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-14';

Enzyme.configure({ adapter: new Adapter() });
import {Film} from './Film'

describe('Film Component', () => {
  it('should have initial state', () => {
    const wrapper = shallow(<Film />);
    expect(wrapper.state('isInfoOpened')).toEqual(false)
  })
  it('should opens info', () => {
    const wrapper = shallow(<Film />);
    const secondButton = wrapper.find('button').at(1);
    secondButton.simulate('click');
    expect(wrapper.state().isInfoOpened).toEqual(true)
  })
})


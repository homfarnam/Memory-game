import React from 'react';
import { cleanup } from '@testing-library/react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import Game from './pages/Game';
import Home from './pages/Home';

Enzyme.configure({ adapter: new Adapter() });
afterEach(cleanup);

describe('snapshot test', () => {
  it('snapshot test Home page', () => {
    const wrapper = Enzyme.shallow(<Home />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('snapshot test Game page', () => {
    const wrapper = Enzyme.shallow(<Game />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

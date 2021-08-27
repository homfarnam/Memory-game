import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });
afterEach(cleanup);

describe('renders learn react link', () => {
  it('renders correctly enzyme, return app to json, snappshot test', () => {
    const wrapper = Enzyme.shallow(<App />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import Game from './pages/Game';
import Home from './pages/Home';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

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

  it('test home page have a title', () => {
    const history = createMemoryHistory();

    const { getAllByText } = render(
      <Router history={history}>
        <Home />
      </Router>
    );

    const text = getAllByText('Click the Memory Card! Game');

    expect(text).toBeTruthy();
  });
});

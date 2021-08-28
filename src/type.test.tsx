import { render, screen, waitFor } from '@testing-library/react';

import Home from './pages/Home';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

test('type on input', async () => {
  const history = createMemoryHistory();

  render(
    <Router history={history}>
      <Home />
    </Router>
  );

  const input = screen.getByLabelText(/User/i);

  userEvent.type(input, 'farnam');

  await waitFor(() => {
    expect(input).toHaveValue('farnam');
  });
});

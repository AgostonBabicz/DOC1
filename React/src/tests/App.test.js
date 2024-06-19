import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../components/App';

test('renders the header', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const headerElement = screen.getByText(/Welcome to VIA tabloid app/i);
  expect(headerElement).toBeInTheDocument();
});

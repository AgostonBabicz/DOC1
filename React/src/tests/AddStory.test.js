import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import AddStory from '../components/AddStory';

test('renders form with header and content inputs', () => {
  render(
    <MemoryRouter initialEntries={['/add']}>
      <AddStory />
    </MemoryRouter>
  );

  const headerInput = screen.getByLabelText(/header:/i);
  expect(headerInput).toBeInTheDocument();

  const contentTextarea = screen.getByLabelText(/content:/i);
  expect(contentTextarea).toBeInTheDocument();

  const submitButton = screen.getByRole('button', { name: /submit/i });
  expect(submitButton).toBeInTheDocument();
});

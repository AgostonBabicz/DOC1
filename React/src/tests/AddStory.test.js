import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Add from './Add';

test('renders sidebar with menu items', () => {
  render(
    <MemoryRouter>
      <Add />
    </MemoryRouter>
  );

  const sidebar = screen.getByRole('navigation', { name: /sidebar/i });
  expect(sidebar).toBeInTheDocument();

  const homeLink = screen.getByRole('link', { name: /home/i });
  expect(homeLink).toBeInTheDocument();
  expect(homeLink).toHaveAttribute('href', '/');

  const addStoryLink = screen.getByRole('link', { name: /add story/i });
  expect(addStoryLink).toBeInTheDocument();
  expect(addStoryLink).toHaveAttribute('href', '/add');

  const storiesLink = screen.getByRole('link', { name: /stories/i });
  expect(storiesLink).toBeInTheDocument();
  expect(storiesLink).toHaveAttribute('href', '/stories');
});

test('renders form with header and content inputs', () => {
  render(
    <MemoryRouter>
      <Add />
    </MemoryRouter>
  );

  const headerInput = screen.getByLabelText(/header:/i);
  expect(headerInput).toBeInTheDocument();

  const contentTextarea = screen.getByLabelText(/content:/i);
  expect(contentTextarea).toBeInTheDocument();

  const submitButton = screen.getByRole('button', { name: /submit/i });
  expect(submitButton).toBeInTheDocument();
});

test('submits the form with correct data', async () => {
  render(
    <MemoryRouter>
      <Add />
    </MemoryRouter>
  );

  const headerInput = screen.getByLabelText(/header:/i);
  const contentTextarea = screen.getByLabelText(/content:/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  fireEvent.change(headerInput, { target: { value: 'Test Header' } });
  fireEvent.change(contentTextarea, { target: { value: 'Test Content' } });

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })
  );

  fireEvent.click(submitButton);

  expect(global.fetch).toHaveBeenCalledWith(
    expect.stringContaining('/stories'),
    expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ header: 'Test Header', content: 'Test Content' }),
    })
  );

  global.fetch.mockClear();
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Edit from './Edit';

jest.mock('../config.js', () => 'http://mock-backend-url');

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, header: 'Test Header', content: 'Test Content', date: '2023-01-01' }]),
    ok: true,
  })
);

beforeEach(() => {
  fetch.mockClear();
});

test('renders sidebar with menu items', () => {
  render(
    <MemoryRouter>
      <Edit />
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

test('renders stories table with fetched data', async () => {
  render(
    <MemoryRouter>
      <Edit />
    </MemoryRouter>
  );

  const storyRows = await waitFor(() => screen.getAllByRole('row'));
  expect(storyRows).toHaveLength(2);

  expect(screen.getByText(/test header/i)).toBeInTheDocument();
  expect(screen.getByText(/test content/i)).toBeInTheDocument();
  expect(screen.getByText(/2023-01-01/i)).toBeInTheDocument();
});

test('deletes a story', async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
    })
  );

  render(
    <MemoryRouter>
      <Edit />
    </MemoryRouter>
  );

  await waitFor(() => screen.getByText(/test header/i));

  const deleteButton = screen.getByRole('button', { name: /delete/i });
  fireEvent.click(deleteButton);

  expect(fetch).toHaveBeenCalledWith(
    expect.stringContaining('/stories/1'),
    expect.objectContaining({ method: 'DELETE' })
  );
});

test('opens edit popup and edits a story', async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
    })
  );

  render(
    <MemoryRouter>
      <Edit />
    </MemoryRouter>
  );

  await waitFor(() => screen.getByText(/test header/i));

  const editButton = screen.getByText(/1/);
  fireEvent.click(editButton);

  const headerInput = screen.getByDisplayValue(/test header/i);
  const contentTextarea = screen.getByDisplayValue(/test content/i);
  expect(headerInput).toBeInTheDocument();
  expect(contentTextarea).toBeInTheDocument();

  fireEvent.change(headerInput, { target: { value: 'Updated Header' } });
  fireEvent.change(contentTextarea, { target: { value: 'Updated Content' } });

  const submitButton = screen.getByRole('button', { name: /edit story/i });
  fireEvent.click(submitButton);

  await waitFor(() =>
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/stories/1?header=Updated%20Header&content=Updated%20Content'),
      expect.objectContaining({ method: 'PUT' })
    )
  );
});

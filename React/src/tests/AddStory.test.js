import React from 'react';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import AddStory from '../components/AddStory';
import App from '../components/App';
import Edit from '../components/Stories';

const routes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/add',
    element: <AddStory />,
  },
  {
    path: '/stories',
    element: <Edit />,
  },
];

test('renders sidebar with menu items', () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/add'],
  });

  render(<RouterProvider router={router} />);

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
  const router = createMemoryRouter(routes, {
    initialEntries: ['/add'],
  });

  render(<RouterProvider router={router} />);

  const headerInput = screen.getByLabelText(/header:/i);
  expect(headerInput).toBeInTheDocument();

  const contentTextarea = screen.getByLabelText(/content:/i);
  expect(contentTextarea).toBeInTheDocument();

  const submitButton = screen.getByRole('button', { name: /submit/i });
  expect(submitButton).toBeInTheDocument();
});

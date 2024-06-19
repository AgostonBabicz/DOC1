import React from 'react';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Edit from '../components/Stories';
import App from '../components/App';
import AddStory from '../components/AddStory';

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
    initialEntries: ['/stories'],
  });

  render(<RouterProvider router={router} />);

  const sidebar = screen.getByRole('navigation');
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

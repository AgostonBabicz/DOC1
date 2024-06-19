import React from 'react';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import App from '../components/App';
import AddStory from '../components/AddStory';
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
    initialEntries: ['/'],
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

test('renders welcome message', () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
  });

  render(<RouterProvider router={router} />);

  const header = screen.getByRole('heading', { name: /welcome to via tabloid app/i });
  expect(header).toBeInTheDocument();

  const paragraph = screen.getByText(/click on the sidebar to navigate to different pages/i);
  expect(paragraph).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import App from './App';

it('renders main page elements', () => {
  render(<App />, {wrapper: MemoryRouter});
  const linkElement = screen.getByText(/Bidali berria/i);
  expect(linkElement).toBeInTheDocument();
  expect(screen.getByRole('link', {name: 'Bidali berria'})).toBeInTheDocument();
  expect(screen.getByRole('link', {name: 'Bidali berria'})).toHaveAttribute('href', '/send');
});

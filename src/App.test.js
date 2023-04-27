import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page', () => {

  render(<App />);
  const linkElement = screen.getAllByText("Login");
  expect(linkElement[0]).toBeInTheDocument();
});

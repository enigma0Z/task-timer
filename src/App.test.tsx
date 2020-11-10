import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders on deck text', () => {
  render(<App />);
  const linkElement = screen.getByText(/On deck: .*/i);
  expect(linkElement).toBeInTheDocument();
});

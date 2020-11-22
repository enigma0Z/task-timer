import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the timer status bar', () => {
  render(<App />);
  expect(screen.getByText(/On deck/i)).toBeInTheDocument();
  expect(screen.getByText(/Time left/i)).toBeInTheDocument();
  expect(screen.getByText(/Up next/i)).toBeInTheDocument();
});

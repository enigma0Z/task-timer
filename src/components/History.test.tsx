import React from 'react';
import { render, screen } from '@testing-library/react';
import { HistoryList } from './History';

test('renders', () => {
  render(<HistoryList />);
});

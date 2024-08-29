import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calculator from './Calculator';

const setup = () => {
    const utils = render(<Calculator />);
    const textarea = screen.getByRole('textbox');
    const button = screen.getByText(/Calculate/i);
    return {
      textarea,
      button,
      ...utils,
    };
  };

describe('Calculator', () => {
    test('shows result when empty input is submitted', () => {
        const { textarea, button, getByText } = setup();
        fireEvent.change(textarea, { target: { value: '' } });
        fireEvent.click(button);
        expect(getByText(/Result: 0/i)).toBeInTheDocument();
      });

  test('shows result when valid input is submitted', () => {
    const { textarea, button, getByText } = setup();
    fireEvent.change(textarea, { target: { value: '1,2,3' } });
    fireEvent.click(button);
    expect(getByText(/Result: 6/i)).toBeInTheDocument();
  });
});
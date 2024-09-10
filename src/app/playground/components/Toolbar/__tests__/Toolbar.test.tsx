import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toolbar } from '../Toolbar';

describe('Toolbar', () => {
  it('renders all three buttons', () => {
    const mockSetTool = jest.fn();
    render(<Toolbar setTool={mockSetTool} />);

    expect(screen.getByTitle('Draw')).toBeInTheDocument();
    expect(screen.getByTitle('Textbox')).toBeInTheDocument();
    expect(screen.getByTitle('Eraser')).toBeInTheDocument();
  });

  it('calls setTool with "draw" when Draw button is clicked', () => {
    const mockSetTool = jest.fn();
    render(<Toolbar setTool={mockSetTool} />);

    fireEvent.click(screen.getByTitle('Draw'));
    expect(mockSetTool).toHaveBeenCalledWith('draw');
  });

  it('calls setTool with "textbox" when Textbox button is clicked', () => {
    const mockSetTool = jest.fn();
    render(<Toolbar setTool={mockSetTool} />);

    fireEvent.click(screen.getByTitle('Textbox'));
    expect(mockSetTool).toHaveBeenCalledWith('textbox');
  });

  it('calls setTool with "eraser" when Eraser button is clicked', () => {
    const mockSetTool = jest.fn();
    render(<Toolbar setTool={mockSetTool} />);

    fireEvent.click(screen.getByTitle('Eraser'));
    expect(mockSetTool).toHaveBeenCalledWith('eraser');
  });
});

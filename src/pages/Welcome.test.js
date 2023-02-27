import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Welcome } from './Welcome';

describe('Welcome component', () => {
  it('should render the welcome message', () => {
    render(<Welcome />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Welcome to Expense Tracker/)).toBeInTheDocument();
  });

  it('should render the Home button', () => {
    render(<Welcome />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Home/)).toBeInTheDocument();
  });

  it('should render the user profile button', () => {
    render(<Welcome />, { wrapper: MemoryRouter });
    expect(screen.getByText(/user profile/)).toBeInTheDocument();
  });

  it('should render the expenses button', () => {
    render(<Welcome />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Expenses/)).toBeInTheDocument();
  });

  it('should render the logout button', () => {
    render(<Welcome />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Logout/)).toBeInTheDocument();
  });

  it('should call the emailverify function when the verify email button is clicked', () => {
    const emailverify = jest.fn();
    render(<Welcome emailverify={emailverify} />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText(/Verify email/));
    expect(emailverify).toHaveBeenCalledTimes(1);
  });
});

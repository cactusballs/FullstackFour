import React from 'react'
import { render, screen } from '@testing-library/react'
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import Registration from './Registration.jsx'
import '@testing-library/jest-dom'

test("rendering registration form and fields correctly", () => {
    render(<Registration />, { wrapper: MemoryRouter });
  
    // Checking if all fields render
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Birthday/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Postcode/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    // Checking for fields exactly matching 'Password' and 'Repeat Password' to differentiate them
    const passwordField = screen.getByLabelText('Password', { selector: 'input' });
    expect(passwordField).toBeInTheDocument();
    const repeatPasswordField = screen.getByLabelText('Repeat Password', { selector: 'input' });
    expect(repeatPasswordField).toBeInTheDocument();
});


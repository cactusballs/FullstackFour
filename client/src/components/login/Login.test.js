import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login.jsx';

test("Rendering login form and fields correctly", () => {
    render(<Login />, { wrapper: BrowserRouter });
  
    // Checking if all fields render
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account\?/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Sign up/i })).toBeInTheDocument();
});


test("Logging in with correct credentials", async () => {
    render(<Login />, { wrapper: BrowserRouter });
  
    // Mocking fetch response for a successful login
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ token: 'mockToken' })
        })
    );

    // Filling out the form
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });

    // Submitting the form
    fireEvent.click(screen.getByRole('button', { name: /Log In/i }));
});

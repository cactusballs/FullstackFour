import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store'; 
import LogoutButton from './LogoutButton'; 

const mockStore = configureStore([]);

// Rendering when ser logged in
test("rendering logout button when user is logged in", () => {
    const store = mockStore({
        user: {
            user: { name: "user" },
            error: null,
        }
    });

    render(
        <Provider store={store}>
            <MemoryRouter>
                <LogoutButton />
            </MemoryRouter>
        </Provider>
    );

    expect(screen.getByRole('button', { name: /Log Out/i })).toBeInTheDocument();
});

// Not rendering when user is logged out
test("not rendering when user is logged out", () => {
    const store = mockStore({
        user: {
            user: null,
            error: null,
        }
    });

    render(
        <Provider store={store}>
            <MemoryRouter>
                <LogoutButton />
            </MemoryRouter>
        </Provider>
    );

    expect(screen.queryByRole('button', { name: /Log Out/i })).not.toBeInTheDocument();
});
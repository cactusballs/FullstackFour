import { render, screen, within, waitFor } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import NavbarComp from './Navbar.jsx';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../../store/Store';

const routes = ['Dashboard', 'Forum', 'Events', 'Meet the Team'];

describe('Navbar', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <NavbarComp />
      </Provider>,
      { wrapper: BrowserRouter }
    )});
  it('should render the Navbar and its links', async () => {
    expect(await screen.findByText('Village')).toBeVisible();

    const navLinks = screen.getAllByRole('link');
    // plus one for the log in page, can be replaced when we work on it 
    expect(navLinks.length).toBe(routes.length + 1); 

    const navContainer = screen.getByRole('navigation'); 
    routes.forEach((route) => {
      expect(within(navContainer).getByText(new RegExp(route, 'i'))).toBeInTheDocument();
    });
  });

  it.each(routes)('should navigate to route %s', async (route) => {
    const link = await screen.findByRole('link', { name: new RegExp(route, 'i') });
    expect(link).toBeInTheDocument();

    userEvent.click(link);

    await waitFor(() => {
      const expectedPath = `/${route.toLowerCase().replace(/\s+/g, '-')}`;
      expect(window.location.pathname).toEqual(expectedPath);
    });
  });
});

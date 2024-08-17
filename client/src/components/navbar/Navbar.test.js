import {render, screen, within, waitFor} from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom'
import NavbarComp from './Navbar.jsx';
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import userEvent from '@testing-library/user-event';
  
const routes = ['Dashboard', 'Forum', 'Events', 'About Us']

describe('Navbar', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
         <NavbarComp />
      </BrowserRouter>
       
    )
  })

  it('should render the Navbar and its links', async () => {
    expect(await screen.findByText('Village')).toBeVisible()

    const navLinks = await screen.findAllByRole('link')
    expect(navLinks.length).toBe(routes.length);

    routes.forEach(route => within(menuList).getByText(route))
  })

  it.each(routes)('should navigate to route %s', async (route) => {
    const link = async (name) => screen.findByRole('link', {name})
    const activeRouteLink = await link(route)

    userEvent.click(activeRouteLink)

    await waitFor(() => {
    expect(window.location.pathname).toEqual(`/${route.toLowerCase()}`)
 
  });
});
});
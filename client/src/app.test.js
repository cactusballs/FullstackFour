import {render, screen} from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom'
import App from './App';
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
  
  test('App routing and rendering', async () => {
    render(<App />)
    expect(screen.getByText(/Log In/i)).toBeInTheDocument()
  
  });
  
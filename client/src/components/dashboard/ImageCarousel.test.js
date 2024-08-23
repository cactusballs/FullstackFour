import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import ImageCarousel from './ImageCarousel';

jest.mock('react-responsive-carousel', () => ({
    Carousel: ({ children }) => <div>{children}</div>,
}));

test('renders ImageCarousel with correct images and descriptions', () => {
    render(<ImageCarousel />);


    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);


    expect(images[0]).toHaveAttribute('src', 'https://images.unsplash.com/photo-1506918092809-0ba639cd1385?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    expect(images[1]).toHaveAttribute('src', 'https://images.unsplash.com/photo-1532499016263-f2c3e89de9cd?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    expect(images[2]).toHaveAttribute('src', 'https://images.unsplash.com/photo-1470608756445-2c9906b0680f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');


    expect(screen.getByText('Visit the most popular pumpkin patches in London...')).toBeInTheDocument();
    expect(screen.getByText('Find the best baking classes in North London.')).toBeInTheDocument();
    expect(screen.getByText('20 beautiful parks to visit this autumn...')).toBeInTheDocument();
});

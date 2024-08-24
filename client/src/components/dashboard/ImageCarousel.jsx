import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ImageCarousel.css';

const ImageCarousel = () => {
    const images = [
        {
            src: 'https://images.unsplash.com/photo-1506918092809-0ba639cd1385?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'Find the most popular pumpkin patches in London on our events page...',
        },
        {
            src: 'https://images.unsplash.com/photo-1532499016263-f2c3e89de9cd?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: '...or maybe search and explore for the best baking classes.',
        },
        {
            src: 'https://images.unsplash.com/photo-1470608756445-2c9906b0680f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'You soon will be discovering the best events in London!',
        },
    ];

    return (
        <Carousel autoPlay={false} showThumbs={false}>
            {images.map((image, index) => (
                <div key={index}>
                    <img src={image.src} alt={`Slide ${index}`} />
                    <p className="legend">{image.description}</p>
                </div>
            ))}
        </Carousel>
    );
};

export default ImageCarousel;



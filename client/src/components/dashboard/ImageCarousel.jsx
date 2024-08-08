import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ImageCarousel.css';

const ImageCarousel = () => {
    const images = [
        'https://via.placeholder.com/600x400.png?text=Image+1',
        'https://via.placeholder.com/600x400.png?text=Image+2',
        'https://via.placeholder.com/600x400.png?text=Image+3',
    ];

    return (
        <Carousel autoPlay={false} showThumbs={false}>
            {images.map((src, index) => (
                <div key={index}>
                    <img src={src} alt={`Slide ${index}`} />
                    <p className="legend">{`Slide ${index}`}</p>
                </div>
            ))}
        </Carousel>
    );
};

export default ImageCarousel;


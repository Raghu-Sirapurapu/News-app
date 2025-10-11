import React, { useState, useEffect, useRef } from 'react';
import {
  img1,img2,img3,img4,img5,img6,img7,img8,img9
} from '../assets/assets'
const images = [
  img1,img2,img3,img4,img5,img6,img7,img8,img9
];

const Hero = () => {
  return (
    <section className=" bg-[#FAFAFA] text-center px-4 py-8 sm:py-10 mt-16">
      
      <HeroSlider />
    </section>
  );
}; 

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const slideInterval = useRef(null);

  const length = images.length;

  // Auto slide every 5 seconds
  useEffect(() => {
    startSlide();
    return () => stopSlide();
  }, [current]);

  const startSlide = () => {
    stopSlide();
    slideInterval.current = setInterval(() => {
      setCurrent(prev => (prev === length - 1 ? 0 : prev + 1));
    }, 5000);
  };

  const stopSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  const goToSlide = (index) => {
    setCurrent(index);
    startSlide();
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
    startSlide();
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
    startSlide();
  };

  return (
    <div className="relative max-w-7xl mx-auto rounded-3xl border border-gray-700 sm:rounded-4xl overflow-hidden shadow-lg shadow-gray-600">
      {/* Slides */}
      <div className="relative h-50 sm:h-[350px] md:h-[450px]">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === current ? 'opacity-100 z-20' : 'opacity-0 z-10'
              }`}
          >
            <img
              src={img}
              alt={`slide-${index + 1}`}
              className="w-full h-full  object-cover "
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute top-0 left-0 h-full w-15 sm:w-20 md:w-30 lg:35 flex items-center justify-center bg-transparent  transition-colors duration-300 rounded-r-lg z-30"
        aria-label="Previous Slide"
        type="button"
      >
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute top-0 right-0 h-full  w-15 sm:w-20 md:w-30 lg:35 flex items-center justify-center bg-transparent  transition-colors duration-300 rounded-l-lg z-30"
        aria-label="Next Slide"
        type="button"
      >
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );

};

export default Hero;

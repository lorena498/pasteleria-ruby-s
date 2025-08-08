import React, { useState, useEffect } from 'react';
import Icon from './Icon';

interface CarouselImage {
  id: string;
  name: string;
  image: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Usa la lista de imágenes dedicada para el carrusel.
  const carouselItems = images.filter(p => p.image);

  // Efecto para el auto-play
  useEffect(() => {
    if (carouselItems.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % carouselItems.length);
    }, 5000); // Cambia la imagen cada 5 segundos

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte
  }, [carouselItems.length]);
  
  // Efecto para la robustez: resetea el índice si se vuelve inválido
  useEffect(() => {
    if (currentIndex >= carouselItems.length) {
      setCurrentIndex(0);
    }
  }, [carouselItems.length, currentIndex]);

  if (carouselItems.length === 0) {
    return null; // No renderizar nada si no hay imágenes
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? carouselItems.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === carouselItems.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const goToSlide = (slideIndex: number) => {
      setCurrentIndex(slideIndex);
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-amber-900 mb-2 font-serif">Nuestra Galería</h2>
        <p className="text-stone-600 mb-8 max-w-2xl mx-auto">Un vistazo a las delicias que preparamos con cariño todos los días.</p>
        
        <div className="relative h-96 w-full max-w-4xl mx-auto">
          <div className="relative h-full rounded-lg overflow-hidden shadow-2xl">
              {/* Slides Container */}
              <div className="w-full h-full whitespace-nowrap transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {carouselItems.map((item) => (
                    <div 
                        key={item.id}
                        className="w-full h-full inline-block bg-center bg-cover"
                        style={{ backgroundImage: `url(${item.image})` }}
                        aria-label={item.name}
                    ></div>
                ))}
              </div>

            {/* Left Arrow */}
            <button 
              onClick={goToPrevious}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white w-10 h-10 rounded-full flex justify-center items-center hover:bg-black/60 transition-colors z-10"
              aria-label="Imagen anterior"
            >
              <Icon icon="fas fa-chevron-left" />
            </button>
            
            {/* Right Arrow */}
            <button 
              onClick={goToNext}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white w-10 h-10 rounded-full flex justify-center items-center hover:bg-black/60 transition-colors z-10"
              aria-label="Siguiente imagen"
            >
              <Icon icon="fas fa-chevron-right" />
            </button>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {carouselItems.map((_, slideIndex) => (
              <button
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`h-3 w-3 rounded-full transition-colors ${
                  currentIndex === slideIndex ? 'bg-amber-800' : 'bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Ir a la imagen ${slideIndex + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
import React from 'react';
import type { Testimonial } from '../types';
import Icon from './Icon';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <Icon key={i} icon={i < rating ? 'fas fa-star' : 'far fa-star'} />
      ))}
    </div>
  );
};

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
    if (testimonials.length === 0) {
        return null; // No renderizar la sección si no hay testimonios
    }
    
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-amber-900 mb-8 font-serif">Lo que dicen nuestros clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-amber-50 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              {testimonial.image && (
                 <img src={testimonial.image} alt={`Producto entregado a ${testimonial.name}`} className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow-sm"/>
              )}
              <StarRating rating={testimonial.rating} />
              <p className="text-stone-600 mt-4 italic">"{testimonial.comment}"</p>
              <p className="font-bold text-amber-800 mt-4">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
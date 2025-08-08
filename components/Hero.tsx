import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative bg-cover bg-center h-[60vh] text-white flex items-center justify-center"
      style={{ backgroundImage: "url('https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-center p-6">
        <h2 className="text-5xl md:text-6xl font-extrabold font-serif drop-shadow-lg leading-tight">
          El Arte de la Repostería <br/> en cada Bocado
        </h2>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
          Descubre nuestra selección de panes artesanales y pasteles hechos con amor y los ingredientes más frescos.
        </p>
        <a 
          href="#productos" 
          className="mt-8 inline-block bg-amber-500 hover:bg-amber-600 text-amber-900 font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 shadow-lg"
        >
          ¡Haz tu pedido ahora!
        </a>
      </div>
    </section>
  );
};

export default Hero;
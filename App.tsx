

import React, { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { INITIAL_PRODUCTS, INITIAL_TESTIMONIALS, INITIAL_BUSINESS_INFO, INITIAL_CHATBOT_CONTEXT, CAROUSEL_IMAGES } from './constants';
import type { Product, Testimonial, BusinessInfo } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import ImageCarousel from './components/ImageCarousel';
import ProductList from './components/ProductList';
import Testimonials from './components/Testimonials';
import LocationMap from './components/LocationMap';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import Chatbot from './components/Chatbot';

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [products, setProducts, productsLoading] = useLocalStorage<Product[]>('bakery_products', INITIAL_PRODUCTS);
  const [testimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [businessInfo, setBusinessInfo, businessInfoLoading] = useLocalStorage<BusinessInfo>('bakery_info', INITIAL_BUSINESS_INFO);
  const [chatbotContext, setChatbotContext, chatbotContextLoading] = useLocalStorage<string>('bakery_chatbot_context', INITIAL_CHATBOT_CONTEXT);
  const [footerClickCount, setFooterClickCount] = useState(0);

  const handleFooterClick = () => {
    const newCount = footerClickCount + 1;
    setFooterClickCount(newCount);
    if (newCount >= 5) {
      setIsAdminMode(!isAdminMode);
      setFooterClickCount(0); // Reset count
      alert(isAdminMode ? 'Saliendo del modo administrador.' : 'Entrando al modo administrador.');
    }
  };
  
  // A simple effect to log a hint for accessing admin mode in the console
  useEffect(() => {
    console.log("Hint: Haz clic en el aviso de copyright en el pie de página 5 veces para entrar/salir del modo de administrador.");
  }, []);

  if (productsLoading || businessInfoLoading || chatbotContextLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-50 font-sans">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-amber-800 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-xl text-amber-900 font-serif">Cargando la dulzura...</p>
        </div>
      </div>
    );
  }

  if (isAdminMode) {
    return <AdminPanel
      products={products}
      setProducts={setProducts}
      businessInfo={businessInfo}
      setBusinessInfo={setBusinessInfo}
      chatbotContext={chatbotContext}
      setChatbotContext={setChatbotContext}
      exitAdminMode={() => setIsAdminMode(false)}
    />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-amber-50 font-sans">
      <Header info={businessInfo} />
      <main className="flex-grow">
        <Hero />
        <ImageCarousel images={CAROUSEL_IMAGES} />
        <ProductList products={products} />
        <Testimonials testimonials={testimonials} />
        <LocationMap info={businessInfo} />
      </main>
      <Footer info={businessInfo} onCopyrightClick={handleFooterClick} />
      <Chatbot products={products} chatbotContext={chatbotContext} businessInfo={businessInfo} />
    </div>
  );
}
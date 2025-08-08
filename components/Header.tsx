import React from 'react';
import type { BusinessInfo } from '../types';
import Icon from './Icon';

interface HeaderProps {
  info: BusinessInfo;
}

const Header: React.FC<HeaderProps> = ({ info }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={info.logo} alt="Logo" className="h-16 w-16 object-contain rounded-full border-2 border-amber-200" />
          <div>
            <h1 className="text-2xl font-bold text-amber-900 font-serif">{info.name}</h1>
            <p className="text-sm text-stone-500 italic">"{info.slogan}"</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a href={`https://wa.me/${info.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600 transition-colors">
            <Icon icon="fab fa-whatsapp" className="text-2xl" />
          </a>
          <a href={info.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 transition-colors">
            <Icon icon="fab fa-instagram" className="text-2xl" />
          </a>
          <a href={info.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors">
            <Icon icon="fab fa-facebook" className="text-2xl" />
          </a>
          <a href={`tel:${info.phone}`} className="text-amber-800 hover:text-amber-900 transition-colors">
            <Icon icon="fas fa-phone" className="text-xl" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
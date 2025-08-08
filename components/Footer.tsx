import React from 'react';
import type { BusinessInfo } from '../types';
import Icon from './Icon';

interface FooterProps {
  info: BusinessInfo;
  onCopyrightClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ info, onCopyrightClick }) => {
  return (
    <footer className="bg-amber-800 text-amber-100">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">{info.name}</h3>
            <p className="text-amber-200">"{info.slogan}"</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Contacto Rápido</h3>
            <ul className="text-amber-200 space-y-1">
              <li><Icon icon="fas fa-phone" className="mr-2" /> {info.phone}</li>
              <li><Icon icon="fab fa-whatsapp" className="mr-2" /> Escríbenos</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Síguenos</h3>
            <div className="flex justify-center md:justify-start space-x-4 mt-2">
              <a href={info.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white"><Icon icon="fab fa-facebook-f" className="text-xl" /></a>
              <a href={info.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white"><Icon icon="fab fa-instagram" className="text-xl" /></a>
              <a href={`https://wa.me/${info.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-white"><Icon icon="fab fa-whatsapp" className="text-xl" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-amber-700 pt-6 text-center text-amber-300 text-sm">
          <p>Aviso de Privacidad | Términos de Servicio</p>
          <p onClick={onCopyrightClick} className="cursor-pointer mt-2">
            © {new Date().getFullYear()} {info.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import type { BusinessInfo } from '../types';
import Icon from './Icon';

interface LocationMapProps {
  info: BusinessInfo;
}

const LocationMap: React.FC<LocationMapProps> = ({ info }) => {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238.7835969291738!2d-99.25078146153793!3d19.305437296659477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cdff1475dba45b%3A0x15a017f294cbcec5!2sAv.%20San%20Jer%C3%B3nimo%202191%2C%20Pueblo%20Nuevo%20Alto%2C%20La%20Magdalena%20Contreras%2C%2010640%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e1!3m2!1ses!2smx!4v1754623149698!5m2!1ses!2smx";

  return (
    <section className="py-16 bg-amber-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-amber-900 mb-8 font-serif">Visítanos o Contáctanos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center"><Icon icon="fas fa-clock" className="mr-2" /> Horario de Atención</h3>
            <ul className="text-stone-600 space-y-1">
              {info.hours.map((line, index) => <li key={index}>{line}</li>)}
            </ul>

            <h3 className="text-xl font-bold text-amber-900 mt-6 mb-4 flex items-center"><Icon icon="fas fa-credit-card" className="mr-2" /> Opciones de Pago</h3>
            <p className="text-stone-600">{info.paymentMethods.join(', ')}</p>

            <h3 className="text-xl font-bold text-amber-900 mt-6 mb-4 flex items-center"><Icon icon="fas fa-paper-plane" className="mr-2" /> Pedidos Especiales</h3>
            <p className="text-stone-600">Para pasteles de boda, eventos o pedidos grandes, contáctanos con anticipación.</p>
            <a 
              href={`https://wa.me/${info.whatsapp}?text=Hola!%20Quisiera%20hacer%20un%20pedido%20especial.`}
              target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-block bg-amber-500 hover:bg-amber-600 text-amber-900 font-bold py-2 px-6 rounded-md transition-colors"
            >
              Cotizar por WhatsApp
            </a>
          </div>
          <div className="h-96 md:h-full rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de la panadería"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
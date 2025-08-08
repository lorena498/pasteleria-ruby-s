import React, { useState } from 'react';
import type { Product } from '../types';
import Icon from './Icon';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 flex flex-col">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-amber-900 font-serif">{product.name}</h3>
        <p className="text-stone-600 mt-2 flex-grow">{product.description}</p>
        <p className="text-2xl font-extrabold text-amber-800 mt-4">${product.price.toFixed(2)}</p>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center border border-stone-300 rounded-md">
            <button onClick={handleDecrement} className="px-3 py-1 text-lg font-bold text-stone-600 hover:bg-stone-200 rounded-l-md">-</button>
            <span className="px-4 py-1 border-l border-r border-stone-300">{quantity}</span>
            <button onClick={handleIncrement} className="px-3 py-1 text-lg font-bold text-stone-600 hover:bg-stone-200 rounded-r-md">+</button>
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center space-x-2">
            <Icon icon="fab fa-whatsapp" />
            <span>Pedir</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
import React, { useState, useMemo, useEffect } from 'react';
import type { Product } from '../types';
import { Category } from '../types';
import ProductCard from './ProductCard';
import Icon from './Icon';

interface ProductListProps {
  products: Product[];
}

const ITEMS_PER_PAGE = 8;

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [filter, setFilter] = useState<Category | 'Todos'>('Todos');
  const [currentPage, setCurrentPage] = useState(1);

  const categories: ('Todos' | Category)[] = ['Todos', ...Object.values(Category)];

  const filteredProducts = useMemo(() => {
    if (filter === 'Todos') {
      return products;
    }
    return products.filter(p => p.category === filter);
  }, [products, filter]);

  // Reset page to 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  const featuredProducts = useMemo(() => products.filter(p => p.featured), [products]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <section id="productos" className="py-16 bg-amber-50">
      <div className="container mx-auto px-6">
        
        {featuredProducts.length > 0 && (
          <div className="mb-12">
              <h2 className="text-3xl font-bold text-center text-amber-900 mb-2 font-serif">Nuestros Destacados</h2>
              <p className="text-center text-stone-600 mb-8">Los favoritos de nuestros clientes, ¡pruébalos hoy!</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                  ))}
              </div>
              <hr className="my-16 border-t-2 border-amber-200"/>
          </div>
        )}
        
        <h2 className="text-3xl font-bold text-center text-amber-900 mb-4 font-serif">Catálogo de Productos</h2>
        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full font-semibold transition-colors text-sm md:text-base ${
                filter === cat
                  ? 'bg-amber-800 text-white shadow-md'
                  : 'bg-white text-amber-800 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {paginatedProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                  ))}
              </div>
              {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-12 space-x-2">
                      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-white rounded-md shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
                          <Icon icon="fas fa-arrow-left" className="mr-2"/> Anterior
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <button key={page} onClick={() => handlePageChange(page)} className={`px-4 py-2 rounded-md ${currentPage === page ? 'bg-amber-800 text-white' : 'bg-white'}`}>
                              {page}
                          </button>
                      ))}
                      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-white rounded-md shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
                          Siguiente <Icon icon="fas fa-arrow-right" className="ml-2"/>
                      </button>
                  </div>
              )}
            </>
        ) : (
            <div className="text-center py-12">
                <p className="text-xl text-stone-500">No hay productos en esta categoría.</p>
                <p className="text-sm text-stone-400 mt-1">
                  {filter === 'Todos' ? 'Aún no se han añadido productos a la tienda.' : `Prueba seleccionando otra categoría.`}
                </p>
            </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;
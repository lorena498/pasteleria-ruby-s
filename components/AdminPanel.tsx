import React, { useState, useRef, useMemo } from 'react';
import type { Product, BusinessInfo } from '../types';
import { Category } from '../types';
import { DEFAULT_LOGO } from '../constants';
import Icon from './Icon';

interface AdminPanelProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  businessInfo: BusinessInfo;
  setBusinessInfo: React.Dispatch<React.SetStateAction<BusinessInfo>>;
  chatbotContext: string;
  setChatbotContext: React.Dispatch<React.SetStateAction<string>>;
  exitAdminMode: () => void;
}

const ADMIN_ITEMS_PER_PAGE = 10;

const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  setProducts,
  businessInfo,
  setBusinessInfo,
  chatbotContext,
  setChatbotContext,
  exitAdminMode,
}) => {
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '0', category: Category.PANES, image: '', featured: false });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(null);
  const [adminCurrentPage, setAdminCurrentPage] = useState(1);
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const productImgInputRef = useRef<HTMLInputElement>(null);
  const editProductImgInputRef = useRef<HTMLInputElement>(null);


  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    const priceNumber = parseFloat(newProduct.price);

    if (newProduct.name.trim() && !isNaN(priceNumber) && priceNumber >= 0) {
      setProducts(prev => [...prev, {
        ...newProduct,
        id: crypto.randomUUID(),
        price: priceNumber,
        image: newProduct.image || `https://picsum.photos/seed/${newProduct.name}/400/300`
      }]);
      setNewProduct({ name: '', description: '', price: '0', category: Category.PANES, image: '', featured: false });
      if(productImgInputRef.current) productImgInputRef.current.value = "";
    } else {
      alert("Por favor, introduce un nombre y un precio válidos. El precio no puede ser negativo.");
    }
  };
  
  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const priceAsFloat = parseFloat(String(editingProduct.price));
    if (editingProduct.name.trim() && !isNaN(priceAsFloat) && priceAsFloat >= 0) {
      const updatedProduct: Product = {
        ...editingProduct,
        price: priceAsFloat,
      };
      setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
      setEditingProduct(null);
    } else {
       alert("Por favor, introduce un nombre y un precio válidos. El precio no puede ser negativo.");
    }
  };

  const requestDeleteProduct = (id: string) => {
    setProductIdToDelete(id);
  };

  const cancelDeleteProduct = () => {
    setProductIdToDelete(null);
  };

  const confirmDeleteProduct = () => {
    if (!productIdToDelete) return;
    setProducts(prev => prev.filter(p => p.id !== productIdToDelete));
    setProductIdToDelete(null);
  };
  
  const totalAdminPages = Math.ceil(products.length / ADMIN_ITEMS_PER_PAGE);
  const paginatedAdminProducts = useMemo(() => products.slice(
    (adminCurrentPage - 1) * ADMIN_ITEMS_PER_PAGE,
    adminCurrentPage * ADMIN_ITEMS_PER_PAGE
  ), [products, adminCurrentPage]);

  const handleAdminPageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalAdminPages) {
      setAdminCurrentPage(newPage);
    }
  };


  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusinessInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="bg-stone-100 min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <h1 className="text-3xl font-bold text-amber-900 font-serif">Panel de Administración</h1>
            <button onClick={exitAdminMode} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
              Salir del Modo Admin
            </button>
          </div>

          {/* Business Info Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-stone-800 mb-4">Información del Negocio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="name" value={businessInfo.name} onChange={handleInfoChange} placeholder="Nombre del Negocio" className="p-2 border rounded"/>
              <input type="text" name="slogan" value={businessInfo.slogan} onChange={handleInfoChange} placeholder="Eslogan" className="p-2 border rounded"/>
              <input type="text" name="phone" value={businessInfo.phone} onChange={handleInfoChange} placeholder="Teléfono" className="p-2 border rounded"/>
              <input type="text" name="whatsapp" value={businessInfo.whatsapp} onChange={handleInfoChange} placeholder="Número de WhatsApp (ej: 52155...)" className="p-2 border rounded"/>
              <div className="flex items-center space-x-2 col-span-1 md:col-span-2">
                  <img src={businessInfo.logo} alt="Logo Preview" className="h-16 w-16 rounded-full object-contain border"/>
                  <input type="file" accept="image/*" ref={logoInputRef} onChange={(e) => handleFileUpload(e, base64 => setBusinessInfo(prev => ({...prev, logo: base64})))} className="p-2 border rounded w-full"/>
                  <button onClick={() => setBusinessInfo(prev => ({...prev, logo: DEFAULT_LOGO}))} className="bg-stone-400 text-white p-2 rounded">Reset Logo</button>
              </div>
            </div>
          </section>

          {/* Product Management Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-stone-800 mb-4">Gestionar Productos</h2>
            <form onSubmit={handleAddProduct} className="bg-stone-50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder="Nombre del producto" className="p-2 border rounded md:col-span-2" required/>
              <input type="number" step="0.01" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} placeholder="Precio" className="p-2 border rounded" required/>
               <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value as Category})} className="p-2 border rounded">
                {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <textarea value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} placeholder="Descripción" className="p-2 border rounded md:col-span-2 h-20"/>
              <input type="file" accept="image/*" ref={productImgInputRef} onChange={(e) => handleFileUpload(e, base64 => setNewProduct({...newProduct, image: base64}))} className="p-2 border rounded md:col-span-2"/>
              <div className="flex items-center space-x-2 md:col-span-2">
                <input type="checkbox" id="featuredAdd" checked={newProduct.featured} onChange={e => setNewProduct({...newProduct, featured: e.target.checked})} className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"/>
                <label htmlFor="featuredAdd" className="text-sm text-gray-700">Marcar como producto destacado</label>
              </div>
              <button type="submit" className="bg-green-500 text-white p-2 rounded md:col-span-2">Añadir Producto</button>
            </form>
            <div className="space-y-2">
               {products.length === 0 ? (
                <div className="text-center py-8 bg-stone-50 rounded-lg border-2 border-dashed">
                  <p className="text-lg text-stone-500">No tienes productos registrados.</p>
                  <p className="text-sm text-stone-400 mt-1">Usa el formulario de arriba para añadir el primero.</p>
                </div>
              ) : (
                paginatedAdminProducts.map(p => (
                  <div key={p.id} className="flex items-center gap-4 bg-white p-2 rounded shadow-sm">
                    <img src={p.image} alt={p.name} className="h-10 w-10 object-cover rounded flex-shrink-0"/>
                    <div className="flex-grow min-w-0">
                      <p className="font-semibold truncate text-black" title={p.name}>{p.name}</p>
                    </div>
                    <span className="text-black font-medium whitespace-nowrap">${p.price.toFixed(2)}</span>
                    <div className="flex items-center gap-3 ml-auto">
                        <button onClick={() => setEditingProduct(p)} className="text-blue-500 hover:text-blue-700" aria-label={`Editar ${p.name}`}>
                            <Icon icon="fas fa-edit" />
                        </button>
                        <button onClick={() => requestDeleteProduct(p.id)} className="text-red-500 hover:text-red-700" aria-label={`Eliminar ${p.name}`}>
                            <Icon icon="fas fa-trash-alt" />
                        </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {totalAdminPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <button onClick={() => handleAdminPageChange(adminCurrentPage - 1)} disabled={adminCurrentPage === 1} className="px-4 py-2 bg-stone-200 rounded-md shadow disabled:opacity-50">Anterior</button>
                <span>Página {adminCurrentPage} de {totalAdminPages}</span>
                <button onClick={() => handleAdminPageChange(adminCurrentPage + 1)} disabled={adminCurrentPage === totalAdminPages} className="px-4 py-2 bg-stone-200 rounded-md shadow disabled:opacity-50">Siguiente</button>
              </div>
            )}
          </section>
          
          {/* Chatbot Context Section */}
          <section>
            <h2 className="text-2xl font-semibold text-stone-800 mb-4">Contexto del Chatbot</h2>
            <p className="text-sm text-stone-500 mb-2">Edita la información que el chatbot usará para responder. Incluye detalles como tiempos de elaboración, ingredientes especiales, etc.</p>
            <textarea
              value={chatbotContext}
              onChange={(e) => setChatbotContext(e.target.value)}
              className="w-full h-64 p-3 border rounded font-mono text-sm"
              placeholder="Escribe aquí la base de conocimiento para el chatbot..."
            />
          </section>
        </div>
      </div>
      
      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-6 text-stone-800 text-center">Editar Producto</h3>
            <form onSubmit={handleUpdateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <input type="text" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} placeholder="Nombre del producto" className="p-2 border rounded md:col-span-2" required/>
               <input type="number" step="0.01" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value) || 0})} placeholder="Precio" className="p-2 border rounded" required/>
               <select value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value as Category})} className="p-2 border rounded">
                {Object.values(Category).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <textarea value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} placeholder="Descripción" className="p-2 border rounded md:col-span-2 h-24"/>
              <div className="flex items-center space-x-2 md:col-span-2">
                <img src={editingProduct.image} alt="Preview" className="h-16 w-16 object-cover rounded"/>
                <input type="file" accept="image/*" ref={editProductImgInputRef} onChange={(e) => handleFileUpload(e, base64 => setEditingProduct({...editingProduct, image: base64}))} className="p-2 border rounded w-full"/>
              </div>
              <div className="flex items-center space-x-2 md:col-span-2">
                <input type="checkbox" id="featuredEdit" checked={editingProduct.featured} onChange={e => setEditingProduct({...editingProduct, featured: e.target.checked})} className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"/>
                <label htmlFor="featuredEdit" className="text-sm text-gray-700">Marcar como producto destacado</label>
              </div>
              <div className="flex justify-end gap-4 md:col-span-2 mt-4">
                <button type="button" onClick={() => setEditingProduct(null)} className="px-6 py-2 bg-stone-200 text-stone-800 rounded-md hover:bg-stone-300">Cancelar</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Deletion Confirmation Modal */}
      {productIdToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm mx-4">
            <h3 className="text-xl font-bold mb-4 text-stone-800">Confirmar Eliminación</h3>
            <p className="text-stone-600 mb-8">¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelDeleteProduct}
                className="px-6 py-2 bg-stone-200 text-stone-800 rounded-md hover:bg-stone-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteProduct}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
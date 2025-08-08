import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../types';
import { Category } from '../types';

const DB_NAME = 'LaDulceEsquinaDB_v2';
const DB_VERSION = 1;
const STORE_NAME = 'appData';

interface KeyValue<T> {
    key: string;
    value: T;
}

// Helper to wrap IndexedDB requests in Promises
function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Singleton pattern for the database connection
let dbPromise: Promise<IDBDatabase> | null = null;
const getDb = (): Promise<IDBDatabase> => {
    if (!dbPromise) {
        dbPromise = new Promise((resolve, reject) => {
            if (typeof window === 'undefined') {
                return reject('IndexedDB not available');
            }
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: 'key' });
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    return dbPromise;
};

async function saveData<T>(key: string, value: T): Promise<void> {
    const db = await getDb();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    await requestToPromise(store.put({ key, value }));
}

const sanitizeProducts = (products: any[]): { cleanedProducts: Product[], needsUpdate: boolean } => {
    if (!Array.isArray(products)) {
        return { cleanedProducts: [], needsUpdate: true };
    }
    const seenIds = new Set<string>();
    let needsUpdate = false;

    const cleanedProducts = products.map(p => {
      if (typeof p !== 'object' || p === null) {
        needsUpdate = true;
        return null;
      }

      const newProduct = { ...p };
      let productWasFixed = false;
      
      if (!newProduct.id || typeof newProduct.id !== 'string' || seenIds.has(newProduct.id)) {
        newProduct.id = crypto.randomUUID();
        productWasFixed = true;
      }
      seenIds.add(newProduct.id);

      if (typeof newProduct.price !== 'number' || isNaN(newProduct.price)) {
        const priceAsFloat = parseFloat(String(newProduct.price));
        newProduct.price = isNaN(priceAsFloat) ? 0 : priceAsFloat;
        productWasFixed = true;
      }
      
      if (typeof newProduct.name !== 'string') { newProduct.name = 'Producto sin nombre'; productWasFixed = true; }
      if (typeof newProduct.category !== 'string' || !Object.values(Category).includes(newProduct.category)) { newProduct.category = Category.PANES; productWasFixed = true; }


      if (productWasFixed) {
        needsUpdate = true;
      }
      return newProduct;
    }).filter((p): p is Product => p !== null);

    return { cleanedProducts, needsUpdate };
};


/**
 * Hook to persist state in IndexedDB. Replaces useLocalStorage for better performance and higher storage capacity.
 * @param key The key for the IndexedDB store.
 * @param initialValue The value to use initially and if nothing is stored.
 * @returns A tuple [value, functionToUpdateValue, isLoading]
 */
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>, boolean] {
  
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    let isMounted = true;
    
    getDb().then(db => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        return requestToPromise<KeyValue<T> | undefined>(store.get(key));
    }).then(result => {
        if (!isMounted) return;

        if (result) {
            let value = result.value;
            // Sanitize products data if it's the right key
            if (key === 'bakery_products') {
                const { cleanedProducts, needsUpdate } = sanitizeProducts(value as any);
                if (needsUpdate) {
                    console.log("Datos de productos corruptos detectados en IndexedDB. Realizando reparación y guardado automático...");
                    saveData(key, cleanedProducts as any);
                }
                setStoredValue(cleanedProducts as any);
            } else {
                setStoredValue(value);
            }
        } else {
           // Not found, so save and set the initial value
           setStoredValue(initialValue);
           saveData(key, initialValue);
        }
    }).catch(error => {
        console.error(`Error loading key "${key}" from IndexedDB. Falling back to initial value.`, error);
        setStoredValue(initialValue);
    }).finally(() => {
        if (isMounted) {
            setLoading(false);
        }
    });

    return () => { isMounted = false; };
  }, [key]);

  const setValue: React.Dispatch<React.SetStateAction<T>> = useCallback((value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    saveData(key, valueToStore).catch(err => {
      console.error(`Error saving key "${key}" to IndexedDB.`, err);
      alert('Hubo un error al intentar guardar los datos. Por favor, inténtalo de nuevo.');
    });
  }, [key, storedValue]);

  return [storedValue, setValue, loading];
}

export default useLocalStorage;

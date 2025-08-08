export enum Category {
  PANES = "Panes",
  PASTELES = "Pasteles",
  GALLETAS = "Galletas",
  ESPECIALES = "Especiales",
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string; // Base64 or URL
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: number; // 1-5
  image?: string; // URL to an image of the delivered product
}

export interface BusinessInfo {
  name: string;
  slogan: string;
  logo: string; // Base64 or URL
  phone: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  address: string;
  hours: string[];
  paymentMethods: string[];
}

export interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
    products?: Product[];
}
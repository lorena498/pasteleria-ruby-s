import type { Product, Testimonial, BusinessInfo } from './types';
import { Category } from './types';

export const DEFAULT_LOGO = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0Y5RjVFRSIgLz48cGF0aCBkPSJtMTAwIDQwYy0xMC40IDEuMS0yMS4yIDcuNS0yNS45IDE4LjEgNC44IDAgOC44IDMuNyA5LjMgOC43bDIuMyAyMy4xaDI4bDIuMy0yMy4xYzAuNS01IDQuNS04LjcgOS4zLTguNy00LjYtMTAuNS0xNS41LTE3LTI1LjktMTguMXptLTMwLjggMzUuOGMwLjEtMC4zIDAuMi0wLjUgMC4zLTAuOHYtMC4xYzEuMS0xMS4zIDEyLjItMjAuMSAyMy45LTIwLjEgNS4zIDAgMTAuMyAyLjEgMTQuMSA1LjktMS44IDAuOS0zLjUgMi4yLTQuOSA0LTQuNC0zLTkuOS00LjYtMTUuNC00LjItOS4zIDAuOC0xNy4xIDgtMTkuNiAxNy4xLTAuMSAwLjMtMC4yIDAuNi0wLjQgMC45bDAgMC4xIDAgMC4xem02MS42IDBjLTAuMS0wLjQtMC4yLTAuNy0wLjQtMS0yLjUtOS4xLTEwLjItMTYuMy0xOS42LTE3LjEtNS41LTAuNS0xMSAzLjEtMTUuNCA0LjEtMS40LTEuOC0zLjEtMy4xLTQuOS00IDMuOC0zLjggOC44LTUuOSAxNC4xLTUuOSAxMS43IDAgMjIuOCA4LjggMjMuOSAyMC4xdi0wLjFsMC4zIDAuOHYwLjFsMCAwLjF6bS0zMC44IDQ3LjljLTcuMSAwLTEyLjgtNS44LTEyLjgtMTIuOHM1Ljc0LTEyLjggMTIuOC0xMi44IDEyLjggNS43NCAxMi44IDEyLjhhMCA3LjEtNS44IDEyLjgtMTIuOCAxMi44eiIgZmlsbD0iI0U1Q0JBNCIgLz48L3N2Zz4=';

export const CAROUSEL_IMAGES = [
    {
        id: 'carousel-1',
        name: 'Pastel de Chocolate Intenso',
        image: 'https://i.pinimg.com/564x/4b/c9/2b/4bc92b3b0d4638b9759c55b552d76f82.jpg',
    },
    {
        id: 'carousel-2',
        name: 'Galletas con Chispas de Chocolate',
        image: 'https://i.pinimg.com/1200x/ce/a1/9c/cea19cbeaa56783d4203689a1efece3f.jpg',
    },
    {
        id: 'carousel-3',
        name: 'Pastel de Tres Leches',
        image: 'https://i.pinimg.com/736x/42/03/b4/4203b45cfcedf100812fc9c1553df414.jpg',
    },
    {
        id: 'carousel-4',
        name: 'Baguette Artesanal',
        image: 'https://i.pinimg.com/736x/c2/69/33/c26933241de0cc656b3590429f13412c.jpg',
    },
    {
        id: 'carousel-5',
        name: 'Macarons Franceses Surtidos',
        image: 'https://i.pinimg.com/736x/a2/09/45/a209450c6bd6ad62780827b0f8cf9d10.jpg',
    },
    {
        id: 'carousel-6',
        name: 'Pastel de Zanahoria',
        image: 'https://i.pinimg.com/564x/19/2d/a0/192da05b76c8c49e295460593781295b.jpg',
    }
];

// Se agregan productos de ejemplo para la demostración visual.
export const INITIAL_PRODUCTS: Product[] = [
    {
        id: 'pastel-choco-01',
        name: 'Pastel de Chocolate Intenso',
        description: 'Clásico y decadente, con capas de bizcocho húmedo y betún de chocolate cremoso.',
        price: 350.00,
        category: Category.PASTELES,
        image: 'https://i.pinimg.com/564x/4b/c9/2b/4bc92b3b0d4638b9759c55b552d76f82.jpg',
        featured: true,
    },
    {
        id: 'pan-concha-01',
        name: 'Concha de Vainilla',
        description: 'Pan dulce tradicional mexicano, suave y con una cubierta crujiente de azúcar sabor vainilla.',
        price: 15.00,
        category: Category.PANES,
        image: 'https://i.pinimg.com/564x/3b/de/72/3bde72d3f6d7d6f5550a6311b5e32408.jpg',
    },
    {
        id: 'galleta-chispas-01',
        name: 'Galletas con Chispas de Chocolate',
        description: 'La galleta clásica, crujiente por fuera y suave por dentro, cargada de chispas de chocolate.',
        price: 20.00,
        category: Category.GALLETAS,
        image: 'https://i.pinimg.com/1200x/ce/a1/9c/cea19cbeaa56783d4203689a1efece3f.jpg',
    },
    {
        id: 'pastel-tres-leches-01',
        name: 'Pastel de Tres Leches',
        description: 'Bizcocho esponjoso bañado en una mezcla de tres leches, cubierto con merengue y una cereza.',
        price: 320.00,
        category: Category.PASTELES,
        image: 'https://i.pinimg.com/736x/42/03/b4/4203b45cfcedf100812fc9c1553df414.jpg',
    },
    {
        id: 'pan-baguette-01',
        name: 'Baguette Artesanal',
        description: 'Corteza crujiente y miga suave, perfecto para sándwiches o para acompañar tus comidas.',
        price: 30.00,
        category: Category.PANES,
        image: 'https://i.pinimg.com/736x/c2/69/33/c26933241de0cc656b3590429f13412c.jpg',
    },
    {
        id: 'especial-macarons-01',
        name: 'Macarons Franceses (Surtido)',
        description: 'Delicados merengues de almendra con rellenos variados: frambuesa, pistacho, chocolate y vainilla.',
        price: 120.00,
        category: Category.ESPECIALES,
        image: 'https://i.pinimg.com/736x/a2/09/45/a209450c6bd6ad62780827b0f8cf9d10.jpg',
        featured: true,
    },
    {
        id: 'pastel-zanahoria-01',
        name: 'Pastel de Zanahoria',
        description: 'Húmedo y especiado, con trocitos de nuez y un delicioso betún de queso crema.',
        price: 380.00,
        category: Category.PASTELES,
        image: 'https://i.pinimg.com/564x/19/2d/a0/192da05b76c8c49e295460593781295b.jpg',
    },
    {
        id: 'pan-croissant-01',
        name: 'Croissant de Mantequilla',
        description: 'Hojaldrado, ligero y crujiente, hecho con mantequilla de alta calidad para un sabor inigualable.',
        price: 25.00,
        category: Category.PANES,
        image: 'https://picsum.photos/seed/croissant/400/300',
    },
    {
        id: 'galleta-polvoron-01',
        name: 'Polvorones de Nuez',
        description: 'Galletas suaves que se deshacen en la boca, repletas de nuez y cubiertas con azúcar glas.',
        price: 80.00,
        category: Category.GALLETAS,
        image: 'https://picsum.photos/seed/polvoron/400/300',
    },
    {
        id: 'especial-rosca-01',
        name: 'Rosca de Reyes (Temporada)',
        description: 'Pan tradicional para el Día de Reyes, adornado con frutas cristalizadas, higos y ate.',
        price: 250.00,
        category: Category.ESPECIALES,
        image: 'https://picsum.photos/seed/rosca_reyes/400/300',
    },
     {
        id: 'cheesecake-fresa-01',
        name: 'Cheesecake de Fresa',
        description: 'Cremoso pastel de queso sobre una base de galleta, coronado con mermelada y fresas frescas.',
        price: 400.00,
        category: Category.PASTELES,
        image: 'https://picsum.photos/seed/cheesecake/400/300',
        featured: true,
    },
    {
        id: 'galleta-avena-01',
        name: 'Galletas de Avena con Pasas',
        description: 'Una opción más saludable pero igualmente deliciosa, perfectas para acompañar un café.',
        price: 25.00,
        category: Category.GALLETAS,
        image: 'https://picsum.photos/seed/oatmeal_cookie/400/300',
    }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [];

export const INITIAL_BUSINESS_INFO: BusinessInfo = {
    name: "La Dulce Esquina",
    slogan: "Repostería artesanal hecha con corazón.",
    logo: DEFAULT_LOGO,
    phone: "5512345678",
    whatsapp: "5215512345678",
    instagram: "https://instagram.com/ladulceesquina",
    facebook: "https://facebook.com/ladulceesquina",
    address: "Av. San Jerónimo 2191, Col. Pueblo Nuevo, Magdalena Contreras",
    hours: ["Lunes a Sábado: 8:00 AM - 8:00 PM", "Domingo: Cerrado"],
    paymentMethods: ["Efectivo", "Tarjeta"],
};

export const INITIAL_CHATBOT_CONTEXT = `
Eres un asistente virtual para una pastelería llamada "La Dulce Esquina".
Tu nombre es "Dulcinea".
Responde a las preguntas de los clientes basándote en la lista de productos y la información del negocio que se te proporciona.
Sé amable y servicial. Si no sabes la respuesta, sugiere contactar al negocio directamente.

**Información base:**
- Horarios: Lunes a Sábado de 8:00 AM a 8:00 PM, Domingos cerrado.
- Métodos de pago: Efectivo y Tarjeta.
- Para pedidos, contactar por teléfono o WhatsApp.
`;

import { GoogleGenAI, Type } from "@google/genai";
import type { Product } from '../types';

const API_KEY = process.env.API_KEY;

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        responseType: { 
            type: Type.STRING,
            enum: ['text', 'product_suggestion'],
            description: "Tipo de respuesta: 'text' para respuestas generales, 'product_suggestion' para recomendar productos."
        },
        text: {
            type: Type.STRING,
            description: "La respuesta conversacional para el usuario."
        },
        products: {
            type: Type.ARRAY,
            description: "Una lista de productos sugeridos. Solo se usa si responseType es 'product_suggestion'.",
            items: {
                type: Type.OBJECT,
                properties: {
                    id: {
                        type: Type.STRING,
                        description: "El ID del producto a sugerir."
                    }
                },
                required: ['id']
            }
        }
    },
    required: ['responseType', 'text']
};


export const getChatbotResponse = async (
  userInput: string,
  productContext: Product[],
  generalContext: string
): Promise<{ text: string; productIds: string[] }> => {
  if (!API_KEY) {
     console.error("API_KEY no encontrada. Asegúrate de que la variable de entorno API_KEY esté configurada en tu entorno de despliegue (ej. Vercel).");
     return { text: "Lo siento, el servicio de chat no está disponible en este momento. La configuración del servidor parece estar incompleta.", productIds: [] };
  }
  
  // Initialize the AI client here, only when it's actually needed.
  // This prevents the entire app from crashing if the API_KEY is missing.
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  // Update product context based on the latest data
  const dynamicProductInfo = productContext.map(p => `- ID: ${p.id}, Nombre: ${p.name}, Precio: $${p.price.toFixed(2)} MXN, Descripción: ${p.description}`).join('\n');
  const fullContext = `${generalContext}\n\nListado de productos actual con sus IDs:\n${dynamicProductInfo}`;

  const model = "gemini-2.5-flash";
  const systemInstruction = `Eres "Dulcinea", una asistente de ventas virtual, amigable y proactiva para la pastelería 'La Dulce Esquina'.
Tu objetivo es ayudar a los clientes e impulsar las ventas sugiriendo productos relevantes de forma atractiva.
Siempre responde en un tono amable y servicial. Comienza siempre presentándote como "Dulcinea".

**Reglas de Interacción:**
1.  **Formato de Respuesta:** Debes responder SIEMPRE con un objeto JSON que siga el esquema definido.
2.  **Respuestas de Texto:** Si el usuario pregunta por información general (horarios, ubicación, etc.), responde con \`responseType: 'text'\` y la información en el campo \`text\`. No incluyas el campo \`products\`.
3.  **Sugerencias de Productos:** Si el usuario muestra intención de compra, pide una recomendación o pregunta por tipos de productos (ej. "¿qué pasteles tienen?", "busco algo para un cumpleaños", "recomiéndame algo dulce"), DEBES cambiar a \`responseType: 'product_suggestion'\`. En este caso:
    -   Escribe un texto de venta atractivo y relevante en el campo \`text\`.
    -   Selecciona de 1 a 3 productos de la lista proporcionada que mejor coincidan con la solicitud del usuario.
    -   Añade los IDs de esos productos en el array \`products\`.
4.  **Uso de la Información:** Basa TODAS tus respuestas y sugerencias únicamente en la información y la lista de productos proporcionada en el CONTEXTO. Si no tienes la información, indica amablemente que no la sabes y sugiere contactar a la tienda.

**CONTEXTO:**
${fullContext}`;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: userInput,
        config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            temperature: 0.7,
        }
    });

    // Use optional chaining and provide a fallback to prevent errors
    const jsonText = response.text?.trim() || '{}';
    const parsedResponse = JSON.parse(jsonText);
    
    const productIds = parsedResponse.products?.map((p: {id: string}) => p.id) || [];
    
    return {
        // Provide a fallback in case the text property is missing from the parsed JSON
        text: parsedResponse.text || "No pude generar una respuesta. Intenta de nuevo.",
        productIds: productIds,
    };

  } catch (error) {
    console.error("Error al llamar o parsear la API de Gemini:", error);
    return { text: "Lo siento, tuve un problema para procesar tu solicitud. Por favor, intenta de nuevo más tarde.", productIds: [] };
  }
};

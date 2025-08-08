import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, Product, BusinessInfo } from '../types';
import Icon from './Icon';
import { getChatbotResponse } from '../services/geminiService';

interface ChatbotProps {
  products: Product[];
  chatbotContext: string;
  businessInfo: BusinessInfo;
}

const Chatbot: React.FC<ChatbotProps> = ({ products, chatbotContext, businessInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ sender: 'bot', text: '¡Hola! Soy Dulcinea, tu asistente virtual. ¿En qué puedo ayudarte hoy?' }]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async () => {
    if (!userInput.trim() || isLoading) return;
    const userMessage: ChatMessage = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const { text, productIds } = await getChatbotResponse(userInput, products, chatbotContext);
      const suggestedProducts = products.filter(p => productIds.includes(p.id));
      
      const botMessage: ChatMessage = {
          sender: 'bot',
          text: text,
          products: suggestedProducts.length > 0 ? suggestedProducts : undefined,
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      const errorMessage: ChatMessage = { sender: 'bot', text: 'Lo siento, algo salió mal. Inténtalo de nuevo.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-amber-800 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl z-50 transition-transform transform hover:scale-110"
        aria-label="Abrir chat"
      >
        <Icon icon={isOpen ? 'fas fa-times' : 'fas fa-comment-dots'} />
      </button>
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[30rem] sm:h-[32rem] bg-white rounded-lg shadow-2xl flex flex-col z-50">
          <header className="bg-amber-800 text-white p-4 rounded-t-lg">
            <h3 className="font-bold text-center">Asistente Virtual</h3>
          </header>
          <div ref={chatBoxRef} className="flex-grow p-4 overflow-y-auto bg-amber-50 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`py-2 px-4 rounded-2xl max-w-xs ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-stone-200 text-stone-800 rounded-bl-none'}`}>
                  {msg.text}
                </div>
                {msg.products && msg.products.length > 0 && (
                  <div className="mt-2 space-y-2 w-full max-w-xs">
                    {msg.products.map(product => (
                      <div key={product.id} className="bg-white rounded-lg shadow p-2 flex items-center gap-3">
                         <img src={product.image} alt={product.name} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
                         <div className="flex-grow">
                            <p className="font-bold text-sm text-amber-900">{product.name}</p>
                            <p className="text-stone-700 font-semibold">${product.price.toFixed(2)}</p>
                             <a 
                                href={`https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(`Hola! Quisiera pedir un(a) ${product.name}.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-md hover:bg-green-600 flex items-center gap-1"
                              >
                               <Icon icon="fab fa-whatsapp" />
                               Pedir
                             </a>
                         </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start mb-3">
                 <div className="py-2 px-4 rounded-2xl bg-stone-200 text-stone-800 rounded-bl-none">
                   <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-stone-500 rounded-full animate-pulse delay-0"></span>
                    <span className="w-2 h-2 bg-stone-500 rounded-full animate-pulse delay-150"></span>
                    <span className="w-2 h-2 bg-stone-500 rounded-full animate-pulse delay-300"></span>
                   </div>
                 </div>
               </div>
            )}
          </div>
          <div className="p-2 border-t border-stone-200 flex">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu pregunta..."
              className="flex-grow p-2 border border-stone-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              className="bg-amber-800 text-white px-4 rounded-r-md hover:bg-amber-900 disabled:bg-stone-400"
              disabled={isLoading}
            >
              <Icon icon="fas fa-paper-plane" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
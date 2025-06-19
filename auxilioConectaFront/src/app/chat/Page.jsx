// src/pages/ChatPage.jsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom"; // <--- IMPORTA useLocation
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { ArrowLeft, Send, Bot, User, Mic } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// No necesitamos 'marked' a menos que el backend envíe Markdown. Si lo usas, descomenta:
// import { marked } from 'marked';

export default function ChatPage() {
  const location = useLocation(); // <--- OBTÉN EL OBJETO LOCATION
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hola! Soy tu asistente de IA potenciado por Llama 3. ¿Cómo puedo ayudarte hoy?",
      multimedia: [],
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);

  // Nuevo estado para controlar si el prompt inicial ya ha sido enviado
  const [initialPromptHandled, setInitialPromptHandled] = useState(false);

  // === CONSOLE.LOG ADICIONAL PARA DEPURACIÓN (FUERA DEL useEffect) ===
  console.log("ChatPage: Objeto location completo al renderizar:", location);
  console.log("ChatPage: location.state al renderizar:", location.state);
  // ===================================================================

  // useEffect para manejar el prompt inicial al cargar la página
  useEffect(() => {
       // Verifica si hay un prompt inicial y si aún no ha sido manejado
    if (location.state && location.state.initialPrompt && !initialPromptHandled) {
      const prompt = location.state.initialPrompt;
      
      // Llama a handleSubmit con el prompt inicial
      // Pasamos `null` como primer argumento porque no hay un evento de formulario
      // Y el prompt como segundo argumento
      handleSubmit(null, prompt);

      // Marca que el prompt inicial ha sido manejado para evitar que se envíe de nuevo
      setInitialPromptHandled(true);

      // Limpia el estado de la navegación para evitar problemas al volver o recargar
      // Esto es opcional, pero ayuda a que el prompt no se re-envíe si el usuario navega
      // lejos y vuelve o recarga la página.
      // Si usas navigate, podrías hacer navigate('/chat', { replace: true, state: {} })
      // Aquí, como estamos en el componente, no tenemos acceso directo al navigate.
      // Para un escenario de desarrollo, esto está bien, pero en producción podrías considerar
      // un contexto o una librería de estado global para manejar los prompts únicos.
    } else if (initialPromptHandled) {
      console.log("ChatPage useEffect: Prompt inicial ya fue manejado.");
    } else {
      console.log("ChatPage useEffect: No hay prompt inicial o la condición no se cumple.");
    }
  }, [location.state, initialPromptHandled]); // Dependencias: location.state y initialPromptHandled



  const handleSubmit = async (e, messageContent = input) => {
    if (e) e.preventDefault();

    const contentToSend = messageContent.trim();
    if (!contentToSend) return;

    const userMessage = { role: "user", content: contentToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      console.log("Enviando mensaje al backend:", contentToSend);
      const response = await fetch('http://127.0.0.1:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mensaje: contentToSend }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en el servidor: ${response.status} - ${errorData.error || response.statusText}`);
      }

      const data = await response.json();
      console.log('Respuesta completa del backend:', data);

      const botResponseText = data.respuesta || "No hay respuesta de texto.";
      const botMultimedia = data.multimedia || [];

      // Crea los mensajes del bot. Primero el texto, luego los elementos multimedia
      const newBotMessages = [{ role: "assistant", content: botResponseText, multimedia: [] }];

      botMultimedia.forEach(mediaItem => {
        newBotMessages.push({
          role: "assistant",
          content: '', // El contenido de texto puede estar vacío si es solo multimedia
          multimedia: mediaItem,
        });
      });

      setMessages((prev) => [...prev, ...newBotMessages]);

    } catch (error) {
      console.error("Error al comunicarse con el backend:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Lo siento, no pude comunicarme con el asistente. Error: ${error.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Tu navegador no soporta reconocimiento de voz.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecording(true);
      console.log('Reconocimiento de voz iniciado...');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('Texto reconocido:', transcript);
      setInput(transcript);
      handleSubmit(null, transcript);
    };

    recognition.onerror = (event) => {
      console.error('Error de reconocimiento de voz:', event.error);
      setIsRecording(false);
      setMessages(prev => [...prev, { role: "assistant", content: 'No se pudo reconocer el audio.' }]);
    };

    recognition.onend = () => {
      setIsRecording(false);
      console.log('Reconocimiento de voz finalizado.');
    };

    recognition.start();
  };


  return (
    <div className="p-4 max-w-2xl mx-auto min-h-screen flex flex-col">
      <Link to="/" className="flex items-center text-blue-500 mb-4">
        <ArrowLeft className="mr-2" />
        Volver al inicio
      </Link>

      {/* Contenedor de mensajes */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <Card
              className={`p-4 max-w-xs w-fit flex items-start gap-3 rounded-xl shadow-sm ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.role === "user" ? (
                <User className="text-white" />
              ) : (
                <Bot className="text-green-600" />
              )}
              {msg.content && <p className="whitespace-pre-wrap">{msg.content}</p>}

              {msg.multimedia && (
                <div className="flex flex-col gap-2 mt-2">
                  {/* Asegúrate que msg.multimedia sea un objeto y no un array para este renderizado */}
                  {/* Si tu backend envía un array de objetos multimedia, necesitarás un .map aquí */}
                  {msg.multimedia.tipo === 'audio' && (
                    <div className="flex flex-col items-center">
                        {msg.multimedia.titulo && <p className="text-sm font-semibold">{msg.multimedia.titulo}</p>}
                        <audio controls src={msg.multimedia.src} className="w-full">
                            Tu navegador no soporta la reproducción de audio.
                        </audio>
                    </div>
                  )}
                  {msg.multimedia.tipo === 'video' && (
                    <div className="flex flex-col items-center">
                        {msg.multimedia.titulo && <p className="text-sm font-semibold">{msg.multimedia.titulo}</p>}
                        <iframe
                            width="100%"
                            height="200"
                            src={msg.multimedia.src}
                            title={msg.multimedia.titulo || "Video explicativo"}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-lg"
                        ></iframe>
                    </div>
                  )}
                  {/* Puedes añadir más tipos de multimedia aquí (ej. 'imagen') */}
                </div>
              )}
            </Card>
          </motion.div>
        ))}

        {isLoading && (
          <motion.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex justify-start"
          >
            <Card className="p-4 flex items-center gap-3 bg-gray-100 rounded-xl">
              <Bot className="text-green-600" />
              <div className="typing-dots">
                <span className="dot bg-gray-500 animate-bounce delay-0"></span>
                <span className="dot bg-gray-500 animate-bounce delay-200"></span>
                <span className="dot bg-gray-500 animate-bounce delay-400"></span>
              </div>
            </Card>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Formulario de entrada */}
      <form onSubmit={handleSubmit} className="flex gap-2 pt-2 sticky bottom-0 bg-white pb-2">
        <Input
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading || isRecording}
        />
        <Button type="submit" disabled={isLoading || isRecording}>
          {isLoading ? "..." : <Send className="w-4 h-4 " />}
        </Button>
        <Button
          type="button"
          onClick={handleVoiceInput}
          disabled={isLoading || isRecording}
          className={`ml-1 px-4 py-2 rounded-lg font-semibold transition duration-300 ${
            isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400 hover:bg-gray-500'
          }`}
        >
          <Mic className="w-4 h-4" />
          {isRecording ? ' Grabando...' : ''}
        </Button>
      </form>

      {/* Estilos para animación typing */}
      <style>
        {`
          .typing-dots {
            display: flex;
            gap: 6px;
          }
          .dot {
            width: 8px;
            height: 8px;
            border-radius: 9999px;
            opacity: 0.6;
          }
          .animate-bounce {
            animation: bounce 1s infinite;
          }
          .delay-0 {
            animation-delay: 0s;
          }
          .delay-200 {
            animation-delay: 0.2s;
          }
          .delay-400 {
            animation-delay: 0.4s;
          }
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-6px);
            }
            75% { /* Añadido para un rebote más natural */
              transform: translateY(-3px);
            }
          }
        `}
      </style>
    </div>
  );
}
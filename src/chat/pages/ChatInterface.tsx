
/**
 * ChatInterface - Interfaz principal de conversación del chat
 *
 * Este componente muestra la conversación entre el usuario y el agente, permitiendo enviar y visualizar mensajes.
 *
 * Características:
 * - Muestra mensajes alineados a la izquierda (agente) y derecha (usuario) con estilos diferenciados.
 * - Usa ScrollArea para permitir scroll en la conversación.
 * - Incluye acciones rápidas en los mensajes del agente (copiar, descargar, like/dislike).
 * - Permite escribir y enviar nuevos mensajes desde un textarea.
 * - Usa useParams para obtener el clientId de la URL y así identificar la conversación activa.
 *
 * Lógica:
 * - Los mensajes se almacenan en el estado local (useState), simulando una conversación.
 * - El input se controla con useState para el textarea.
 * - El diseño es responsivo y accesible usando TailwindCSS y componentes UI reutilizables.
 *
 * Buenas prácticas:
 * - Usa componentes desacoplados para UI y lógica.
 * - Accesibilidad: roles claros, botones con iconos y textos alternativos.
 */
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Copy, Download, ThumbsUp, ThumbsDown, Send } from "lucide-react"
import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query";
import { getClientMessages } from "@/fakeData/fakeData";
import { Button } from "@/components/ui/button"
import { useParams } from 'react-router';


export default function ChatInterface() {
const { clientId } = useParams();


  const [input, setInput] = useState('');
  // Carga los mensajes del cliente seleccionado
  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages", clientId],
    queryFn: () => getClientMessages(clientId ?? ""),
    enabled: !!clientId,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Mensaje enviado:", input);
    setInput('');
  }








  return (
    <div className="flex-1 flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {isLoading && <div className="text-center text-muted-foreground">Cargando mensajes...</div>}
          {!isLoading && (!messages || messages.length === 0) && (
            <div className="text-center text-muted-foreground">No hay mensajes para este cliente.</div>
          )}
          {messages && messages.map((message, index) => (
            <div key={index} className="w-full">
              {message.sender === "agent" ? (
                // Agent message - left aligned
                <div className="flex gap-2 max-w-[80%]">
                  <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">NexTalk</span>
                      <span className="text-sm text-muted-foreground">{message.createdAt instanceof Date ? message.createdAt.toLocaleTimeString() : new Date(message.createdAt).toLocaleTimeString()}</span>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                // User message - right aligned
                <div className="flex flex-col items-end">
                  <div className="text-right mb-1">
                    <span className="text-sm font-medium mr-2">G5</span>
                    <span className="text-sm text-muted-foreground">{message.createdAt instanceof Date ? message.createdAt.toLocaleTimeString() : new Date(message.createdAt).toLocaleTimeString()}</span>
                  </div>
                  <div className="bg-black text-white p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Textarea
            placeholder="Type a message as a customer"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[44px] h-[44px] resize-none py-3"
          />
          <Button className="h-[44px] px-4 flex items-center gap-2">
            <Send className="h-4 w-4" />
            <span>Send</span>
          </Button>
        </form>

      </div>
    </div>
  )
}

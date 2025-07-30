
/**
 * @fileoverview Layout principal para la sección de chat
 * 
 * Este componente define la estructura visual y navegación del módulo de chat.
 * Implementa un layout de tres paneles que sirve como base para todas
 * las páginas relacionadas con conversaciones.
 * 
 * Características principales:
 * - Layout responsivo de tres columnas
 * - Integración con React Router para navegación
 * - Sidebar de contactos con scroll
 * - Panel principal dinámico con Outlet
 * - Panel de detalles contextual
 * 
 * @author Tu Equipo de Desarrollo
 * @version 1.0.0
 */

/**
 * ChatLayout - Layout principal para la sección de chat
 *
 * Este componente define la estructura visual y lógica común para todas las páginas de chat.
 *
 * Estructura:
 * - Sidebar izquierdo: Lista de contactos y recientes (ContactList)
 * - Panel principal: Header con acciones y <Outlet /> para renderizar la conversación o pantalla seleccionada
 * - Panel derecho: Detalles del contacto seleccionado, mensaje de selección o skeleton de carga
 *
 * ¿Por qué usar <Outlet />?
 * Permite que el layout muestre dinámicamente la conversación activa o una pantalla de bienvenida según la subruta (/chat/:clientId o /chat)
 *
 * Componentes auxiliares:
 * - ContactList: Lista de contactos y recientes
 * - ContactInfo: Detalles del contacto (puede alternarse con NoContactSelected o ContactInfoSkeleton)
 * - NoContactSelected: Mensaje amigable cuando no hay contacto seleccionado
 * - ContactInfoSkeleton: Skeleton loader para mejorar la experiencia de carga
 */
import { Outlet } from 'react-router';
import { Link } from 'react-router';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { ContactList } from '../components/ContactList';
import { ContactInfo } from '../components/contact-details/ContactInfo';
import { NoContactSelected } from '../components/contact-details/NoContactSelected';
import { ContactInfoSkeleton } from '../components/contact-details/ContactInfoSkeleton';
import { ContactDetails } from '../components/contact-details/ContactDetails';

/**
 * Componente de layout principal para el módulo de chat
 * 
 * @returns {JSX.Element} Layout de tres paneles para la sección de chat
 * 
 * @description
 * Este componente implementa la estructura base para todas las páginas de chat,
 * proporcionando una interfaz consistente y funcional.
 * 
 * **Estructura del Layout:**
 * 
 * 1. **Sidebar Izquierdo (w-64):**
 *    - Header con logo "NexTalk" y navegación a /chat
 *    - Componente ContactList para mostrar contactos disponibles
 *    - Scroll vertical para listas largas
 * 
 * 2. **Panel Principal (flex-1):**
 *    - Header con acciones (Save conversation, Close)
 *    - Outlet de React Router para contenido dinámico
 *    - Renderiza ChatInterface o páginas de bienvenida según la ruta
 * 
 * 3. **Panel Derecho (w-80):**
 *    - Header "Contact details"
 *    - Contenido contextual según el estado:
 *      - ContactInfo: Detalles del contacto seleccionado
 *      - NoContactSelected: Mensaje cuando no hay selección
 *      - ContactInfoSkeleton: Loader durante carga
 * 
 * **Patrones de React Router:**
 * - Usa <Outlet /> para renderizado dinámico de rutas hijas
 * - Link to="/chat" para navegación al estado inicial
 * - Compatible con rutas como /chat/:clientId
 * 
 * **Responsive Design:**
 * - Layout fijo para pantallas de escritorio
 * - Anchos específicos: sidebar (256px), panel derecho (320px)
 * - Panel principal se ajusta automáticamente (flex-1)
 * 
 * @example
 * // Uso en el router principal
 * <Route path="/chat" element={<ChatLayout />}>
 *   <Route index element={<WelcomePage />} />
 *   <Route path=":clientId" element={<ChatInterface />} />
 * </Route>
 */
export default function ChatLayout() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/10">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary" />
            <Link to="/chat">
            <span className="font-semibold">NexTalk</span>
            </Link>
          </div>
        </div>
        <ContactList />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 border-b px-4 flex items-center justify-between">
            <div></div> {/* Empty div to maintain spacing */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Save conversation
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <Outlet />
        </div>

        {/* Right Panel - Contact Details */}
        <div className="w-80 border-l">
          <div className="h-14 border-b px-4 flex items-center">
            <h2 className="font-medium">Contact details</h2>
          </div>
          <ContactDetails/>
          {/* <ContactInfo /> */}
          {/*<NoContactSelected />
          {/* <ContactInfoSkeleton /> */}
        </div>
      </div>
    </div>
  );
}

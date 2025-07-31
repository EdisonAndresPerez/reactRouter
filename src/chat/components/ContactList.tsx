
/**
 * @fileoverview Componente de lista de contactos para el chat
 * 
 * Este componente renderiza la barra lateral izquierda que contiene
 * la lista de contactos disponibles y chats recientes. Integra
 * React Query para la gestión de datos y React Router para navegación.
 * 
 * Características principales:
 * - Lista scrolleable de contactos
 * - Navegación a conversaciones específicas
 * - Avatares con iniciales y colores
 * - Sección de contactos recientes
 * - Integración con React Query
 * 
 * @author Tu Equipo de Desarrollo
 * @version 1.0.0
 */

/**
 * ContactList - Lista de contactos y recientes para el chat
 *
 * Este componente muestra la lista de contactos disponibles y los chats recientes en la barra lateral izquierda del layout de chat.
 *
 * Estructura:
 * - Usa ScrollArea para permitir scroll vertical si hay muchos contactos.
 * - Sección "Contacts": muestra contactos principales, algunos como botones y otros como enlaces navegables (NavLink) a /chat/:clientId.
 * - Sección "Recent": muestra los chats recientes como botones.
 *
 * Lógica:
 * - NavLink permite navegar a la conversación de un cliente específico usando React Router.
 * - Button se usa para contactos que aún no tienen navegación implementada o para acciones futuras.
 *
 * Buenas prácticas:
 * - Usa utilidades de TailwindCSS para estilos y responsividad.
 * - Los avatares de colores ayudan a identificar visualmente a cada contacto.
 */
import { NavLink } from 'react-router';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useQuery } from '@tanstack/react-query';
import { getClients } from '@/fakeData/fakeData';

/**
 * Componente de lista de contactos para el chat
 * 
 * @returns {JSX.Element} Lista scrolleable de contactos con navegación
 * 
 * @description
 * Este componente renderiza la barra lateral izquierda del chat que contiene:
 * 
 * **Funcionalidades principales:**
 * - Lista de contactos principales con navegación a conversaciones
 * - Sección de contactos recientes
 * - Integración con React Query para datos en tiempo real
 * - Avatares con iniciales y colores distintivos
 * 
 * **Gestión de datos:**
 * - Utiliza useQuery de React Query para obtener la lista de clientes
 * - Cache automático y sincronización de datos
 * - Manejo de estados de loading y error
 * 
 * **Navegación:**
 * - NavLink para rutas activas (/chat/:clientId)
 * - Botones para contactos sin navegación implementada
 * 
 * **Animaciones y Interactividad:**
 * - Transiciones suaves de 300ms con ease-in-out
 * - Estados activos con escalado (scale-[1.02])
 * - Hover effects con micro-animaciones
 * - Avatares con escalado dinámico en estado activo
 * - Bordes y sombras animadas para feedback visual
 * 
 * @example
 * // Uso en ChatLayout
 * <div className="sidebar">
 *   <ContactList />
 * </div>
 */
export const ContactList = () => {

  /**
   * Query para obtener la lista de clientes desde la API simulada
   * 
   * @description
   * - queryKey: Identificador único para el cache ['clients']
   * - queryFn: Función que ejecuta getClients() para obtener los datos
   * - Retorna: { data: clients, isLoading, error }
   */
  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: () => getClients(), 
    staleTime: 100 * 60 * 5
  })
  return (
    <ScrollArea className="h-[calc(100vh-120px)]">
      <div className="space-y-4 p-4">
        <div className="space-y-1">
          <h3 className="px-2 text-sm font-semibold">Contacts</h3>
          <div className="space-y-1">
            
            {isLoading && <p>Loading contacts...</p>}

            {/* Lista dinámica de clientes con animaciones */}
            {clients?.map((client, key) => (
            <NavLink
             key={key}
              to={`/chat/${client.id}`}
               className={({ isActive }) => 
                 `w-full flex items-center mt-3 p-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-muted/50 ${
                   isActive 
                     ? "bg-primary/10 border-l-4 border-primary shadow-md transform scale-[1.02]" 
                     : "hover:transform hover:scale-[1.01]"
                 }`
               }>
              {({ isActive }) => (
                <>
                  <div className={`h-6 w-6 rounded-full mr-3 flex-shrink-0 flex items-center justify-center text-white text-xs font-semibold transition-all duration-300 ${
                    isActive ? "bg-primary shadow-lg transform scale-110" : "bg-gray-400"
                  }`}>
                    {client.name.charAt(0).toUpperCase()}
                  </div>
                  <span className='font-medium text-sm truncate transition-colors duration-300'>{client.name}</span>
                </>
              )}
            </NavLink>
            ))}

        </div>
        <div className="pt-4 border-t mt-4">
          <h3 className="px-2 text-sm font-semibold mb-1">Recent</h3>
          <Button variant="ghost" className="w-full justify-start">
            <div className="h-6 w-6 rounded-full bg-gray-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
              TM
            </div>
            Thomas Miller
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <div className="h-6 w-6 rounded-full bg-red-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
              SB
            </div>
            Sarah Brown
          </Button>
        </div>
      </div>
    </div>
    </ScrollArea>
  );
};
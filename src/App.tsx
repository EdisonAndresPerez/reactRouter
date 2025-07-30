/**
 * @fileoverview Componente raíz de la aplicación
 * 
 * Este archivo define el componente principal de la aplicación React.
 * Configura los providers globales necesarios para el funcionamiento
 * de toda la aplicación, incluyendo:
 * - React Query para manejo de estado del servidor
 * - Sistema de routing con React Router
 * - Herramientas de desarrollo
 * 
 * @author Tu Equipo de Desarrollo
 * @version 1.0.0
 */

import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import { AppRouter } from './AppRouter';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

/**
 * Instancia global de QueryClient para React Query
 * 
 * @description
 * Configura el cliente principal de React Query que manejará:
 * - Cache de datos del servidor
 * - Sincronización automática
 * - Estados de loading/error
 * - Revalidación de datos
 * 
 * @note Se crea una sola instancia para toda la aplicación
 * para mantener un cache coherente y evitar duplicación de datos.
 */
const queryClient = new QueryClient()

/**
 * Componente raíz de la aplicación
 * 
 * @returns {JSX.Element} Estructura completa de la aplicación
 * 
 * @description
 * Este componente actúa como el contenedor principal que:
 * 
 * 1. **QueryClientProvider**: Proporciona el cliente de React Query
 *    a todos los componentes hijos, permitiendo el uso de hooks
 *    como useQuery, useMutation, etc.
 * 
 * 2. **AppRouter**: Renderiza el sistema de rutas principal
 *    que maneja toda la navegación de la aplicación.
 * 
 * 3. **ReactQueryDevtools**: Herramienta de desarrollo que permite
 *    inspeccionar el cache, queries activas, y estado de React Query.
 *    Solo visible en modo desarrollo.
 * 
 * @example
 * // Uso típico en main.tsx
 * import App from './App';
 * ReactDOM.render(<App />, document.getElementById('root'));
 * 
 * @structure
 * App
 * └── QueryClientProvider (Provider de React Query)
 *     ├── AppRouter (Sistema de rutas)
 *     └── ReactQueryDevtools (Solo en desarrollo)
 */
function App() {
  return (
    <>
     <QueryClientProvider client={queryClient}>

      <AppRouter />

      <ReactQueryDevtools initialIsOpen={true} />

     </QueryClientProvider>
    </>
  );
}

export default App;
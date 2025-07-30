import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

import { AuthLayout } from './auth/layout/AuthLayout';
import { LoginForm } from './auth/pages/LoginForm';
import { RegisterForm} from './auth/pages/RegisterForm';

import { sleep } from './lib/sleep';
import { PrivateRouter } from './auth/components/PrivateRouter';
import { useQuery } from '@tanstack/react-query';
import { checkAuth } from './fakeData/fakeData';

/**
 * AppRouter - Enrutador principal de la aplicación
 *
 * Este componente define todas las rutas principales de la app usando React Router.
 *
 * Características clave:
 * - Maneja rutas públicas (autenticación) y privadas (chat)
 * - Usa carga perezosa (lazy loading) para cargar solo el código necesario de cada sección cuando el usuario la visita
 * - Utiliza layouts para agrupar páginas relacionadas (por ejemplo, AuthLayout para login/registro y ChatLayout para el chat)
 * - Muestra un spinner de carga mientras se descargan los componentes perezosos
 * - Redirige rutas no válidas o la raíz a la pantalla de autenticación
 *
 * ¿Por qué es importante la carga perezosa?
 * Permite que la aplicación cargue más rápido, ya que solo descarga el código de la sección que el usuario visita, en vez de todo el proyecto de una vez.
 *
 * ¿Qué es un layout?
 * Es un componente que define la estructura visual y lógica común para un grupo de páginas (por ejemplo, barra lateral, header, etc.).
 *
 * ¿Qué es <Outlet />?
 * Es un componente de React Router que sirve como "punto de inserción" para renderizar la página hija correspondiente según la ruta.
 */
const ChatLayout = lazy(async () => {
  await sleep(1500);
  return import('./chat/layout/ChatLayout');
});
const ChatPage = lazy(async () => import('./chat/pages/ChatInterface'));
const NoChatSelectedPage = lazy(
  async () => import('./chat/pages/noChatSelectedPage')
);

export const AppRouter = () => {
  const {data: user, isLoading, isError, error } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        throw new Error('No token found');
      }
      return checkAuth(token);
    }

  })

  if (isLoading) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <span className="text-primary font-semibold text-lg">Validando sesión...</span>
      </div>
    </div>
  );
}


  return (
    <BrowserRouter>
      <Routes>
        {/*
          Rutas de autenticación:
          - /auth: Muestra el layout de autenticación (AuthLayout)
          - /auth (index): Muestra el formulario de login
          - /auth/register: Muestra el formulario de registro
          - <Outlet /> en AuthLayout permite mostrar la página hija según la subruta
        */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginForm />} />
          <Route path="/auth/register" element={<RegisterForm />} />
          {/* <Route path="login" element={<Login />} /> */}
          {/* <Route path="/auth" element={<Navigate to="/auth/login" />} /> */}
        </Route> 

        {/*
          Rutas del chat:
          - /chat: Muestra el layout del chat (ChatLayout) usando carga perezosa
          - Suspense muestra un spinner mientras se descarga el layout
          - /chat (index): Muestra la pantalla de “ningún chat seleccionado”
          - /chat/:clientId: Muestra el chat con el cliente seleccionado
          - <Outlet /> en ChatLayout permite mostrar la página hija según la subruta
        */}
        <Route
          path="/chat"
          element={
            <Suspense
              fallback={
                <div className="flex h-screen w-full items-center justify-center bg-background">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              }
            >
              <ChatLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <PrivateRouter isAuthenticated={!!user}>
                <NoChatSelectedPage />
              </PrivateRouter>
            }
          />
          <Route
            path="/chat/:clientId"
            element={
              <PrivateRouter isAuthenticated={!!user}>
                <ChatPage />
              </PrivateRouter>
            }
          />
        </Route>

        {/*
          Redirecciones:
          - /: Redirige a /auth
          - Cualquier ruta no definida (*): Redirige a /auth
        */}
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};
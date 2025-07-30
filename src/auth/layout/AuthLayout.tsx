
/**
 * AuthLayout - Layout para páginas de autenticación
 *
 * Este componente define la estructura visual común para todas las páginas de autenticación (login, registro, etc.).
 *
 * ¿Por qué usar un layout?
 * Permite centralizar estilos, centrar el contenido y mantener una experiencia visual consistente en todas las páginas de autenticación.
 *
 * ¿Por qué usamos <Outlet />?
 * <Outlet /> es un componente de React Router que actúa como un "punto de inserción" para renderizar la página hija correspondiente según la subruta.
 * Así, AuthLayout puede mostrar dinámicamente el formulario de login, registro u otra página de autenticación según la ruta activa, sin duplicar estructura o estilos.
 */
import { Outlet } from 'react-router';

export const AuthLayout = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        {/* <LoginPage /> */}
        <Outlet />
      </div>
    </div>
  );
};
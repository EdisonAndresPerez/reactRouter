/**
 * NoChatSelectedPage - Pantalla cuando no hay chat seleccionado
 *
 * Este componente se muestra cuando el usuario entra a la sección de chat pero no ha seleccionado ninguna conversación.
 *
 * Estructura:
 * - Mensaje centrado en pantalla indicando que no hay chat seleccionado.
 * - Instrucción para seleccionar un chat desde la barra lateral.
 *
 * Buenas prácticas:
 * - Mejora la experiencia de usuario evitando pantallas vacías.
 * - Usa TailwindCSS para centrar y estilizar el contenido.
 */
export const NoChatSelectedPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">No chat selected</h1>
        <p className="text-muted-foreground">Select a chat from the sidebar</p>
      </div>
    </div>
  );
};

export default NoChatSelectedPage;
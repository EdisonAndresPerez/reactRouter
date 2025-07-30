/**
 * @fileoverview Interfaces y tipos para el sistema de chat
 * 
 * Este archivo define todas las estructuras de datos utilizadas
 * en la aplicación de chat:
 * - Planes de suscripción
 * - Información de clientes
 * - Estructura de mensajes
 * 
 * @author Tu Equipo de Desarrollo
 * @version 1.0.0
 */

/**
 * Valores constantes para los planes de suscripción disponibles
 * 
 * @description
 * Define los diferentes niveles de servicio que puede tener un cliente.
 * Se usa como const assertion para garantizar valores consistentes y 
 * compatibilidad con configuraciones TypeScript estrictas.
 * 
 * @example
 * const clientPlan = Plan.PRO;
 * if (clientPlan === Plan.ENTERPRISE) {
 *   // Funcionalidad premium
 * }
 */
export const Plan = {
  BASIC: 'basic',          // Plan básico - funcionalidades limitadas
  PRO: 'pro',              // Plan profesional - funcionalidades intermedias
  PREMIUM: 'premium',      // Plan premium - funcionalidades avanzadas
  ENTERPRISE: 'enterprise', // Plan empresarial - todas las funcionalidades
} as const;

/**
 * Tipo derivado de los valores del objeto Plan
 * 
 * @description
 * Permite usar los valores de Plan como tipo TypeScript,
 * proporcionando autocompletado y verificación de tipos.
 */
export type Plan = typeof Plan[keyof typeof Plan];

/**
 * Interface que define la estructura de un cliente
 * 
 * @description
 * Representa toda la información asociada a un cliente del sistema.
 * Incluye datos personales, de contacto y información de suscripción.
 * 
 * @example
 * const client: Client = {
 *   id: 'C1-12345',
 *   name: 'Juan Pérez',
 *   email: 'juan@example.com',
 *   phone: '+506 1234-5678',
 *   address: 'San José, Costa Rica',
 *   memberSince: new Date('2024-01-15'),
 *   currentPlan: Plan.PRO
 * };
 */
export interface Client {
  id: string;           // Identificador único (formato: C1-XXXXX)
  name: string;         // Nombre completo del cliente
  email: string;        // Correo electrónico de contacto
  phone: string;        // Número telefónico (formato costarricense)
  address: string;      // Dirección física completa
  memberSince: Date;    // Fecha de registro en el sistema
  currentPlan: Plan;    // Plan de suscripción actual
}

/**
 * Interface que define la estructura de un mensaje
 * 
 * @description
 * Representa un mensaje individual en una conversación entre
 * un cliente y un agente de soporte. Incluye metadatos como
 * timestamp, remitente y estado de reacción.
 * 
 * @example
 * const message: Message = {
 *   id: 'M1-67890',
 *   clientId: 'C1-12345',
 *   content: '¿Cómo puedo actualizar mi plan?',
 *   createdAt: new Date(),
 *   sender: 'client',
 *   like: 'neutral'
 * };
 */
export interface Message {
  id: string;           // Identificador único del mensaje (formato: M1-XXXXX)
  clientId: string;     // ID del cliente asociado (formato: C1-XXXXX)
  content: string;      // Contenido del mensaje en texto plano
  createdAt: Date;      // Timestamp de creación del mensaje
  sender: 'agent' | 'client'; // Quien envió el mensaje
  like: 'liked' | 'disliked' | 'neutral'; // Estado de reacción del mensaje
}
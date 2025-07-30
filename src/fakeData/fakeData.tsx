/**
 * @fileoverview Simulador de API y datos ficticios para la aplicación de chat
 * 
 * Este archivo contiene todas las funciones necesarias para simular una API real
 * sin necesidad de un backend. Incluye:
 * - Autenticación de usuarios
 * - Gestión de clientes 
 * - Manejo de mensajes
 * - Datos de prueba precargados
 * 
 * @author Tu Equipo de Desarrollo
 * @version 1.0.0
 */

import type { Client, Message } from '../chat/interfaces/chat.interface';
import { Plan } from '../chat/interfaces/chat.interface';
import { sleep } from '@/lib/sleep';

/**
 * ================================
 * SECCIÓN DE AUTENTICACIÓN
 * ================================
 */
/**
 * Simula el proceso de login de un usuario
 * 
 * @returns {Promise<Object>} Datos del usuario autenticado con token
 * 
 * @description
 * - Simula una demora de red de 1.2 segundos
 * - Retorna datos hardcodeados de un usuario de prueba
 * - En una app real, esto haría una petición HTTP al servidor
 * 
 * @example
 * const userData = await loginUser();
 * console.log(userData.token); // 'token-1234567890'
 */
export const loginUser = async () => {
  await sleep(1200);
  return {
    id: 'U1-12345',
    name: 'Edison Perez',
    email: 'edisonperez@gmail.com',
    token: 'token-1234567890',
  };
};

/**
 * Verifica si un token de autenticación es válido
 * 
 * @param {string} token - Token a verificar
 * @returns {Promise<Object>} Datos básicos del usuario si el token es válido
 * @throws {Error} Si el token es inválido
 * 
 * @description
 * - Simula una demora de verificación de 500ms
 * - Solo acepta el token hardcodeado 'token-1234567890'
 * - En una app real, esto verificaría el token con el servidor
 * 
 * @example
 * try {
 *   const user = await checkAuth('token-1234567890');
 *   console.log(user.name); // 'Fernando Herrera'
 * } catch (error) {
 *   console.log('Token inválido');
 * }
 */

export const checkAuth = async (token: string) => {
  await sleep(500);

  if (token !== 'token-1234567890') {
    throw new Error('Invalid token');
  }

  console.log('checkAuth', token);

  return {
    id: 'U1-12345',
    name: 'Edison Perez',
  };
};

/**
 * ================================
 * SECCIÓN DE GESTIÓN DE CLIENTES
 * ================================
 */

/**
 * Almacén interno para simular una base de datos de clientes
 * 
 * @description
 * Utiliza un Record (objeto) para almacenar clientes por ID, lo que permite:
 * - Búsquedas rápidas por ID (O(1))
 * - Fácil actualización y eliminación
 * - Simulación realista de una base de datos
 */
const fakeClients = {
  // Almacén principal: { clientId: Client }
  records: {} as Record<string, Client>,
  
  /**
   * Obtiene un cliente específico por su ID
   * @param {string} id - ID del cliente a buscar
   * @returns {Client} El cliente encontrado
   */
  getClient: (id: string) => fakeClients.records[id],
  
  /**
   * Obtiene todos los clientes ordenados por fecha de registro (más recientes primero)
   * @returns {Client[]} Array de clientes ordenados
   */
  getClients: () => {
    return Object.values(fakeClients.records).sort(
      (a, b) => b.memberSince.getTime() - a.memberSince.getTime()
    );
  },
  
  /**
   * Crea un nuevo cliente vacío con datos por defecto
   * @returns {Client} Cliente recién creado con ID generado automáticamente
   */
  createEmptyClient: () => {
    const client: Client = {
      id: `C1-${Math.floor(10000 + Math.random() * 90000)}`, // Genera formato C1-XXXXX
      name: '',
      email: '',
      phone: '',
      address: '',
      memberSince: new Date(),
      currentPlan: Plan.BASIC,
    };

    fakeClients.setClient(client);

    return client;
  },
  
  /**
   * Guarda o actualiza un cliente en el almacén
   * @param {Client} client - Cliente a guardar
   */
  setClient: (client: Client) => {
    fakeClients.records[client.id] = client;
  },
};

/**
 * Obtiene la lista completa de clientes
 * 
 * @returns {Promise<Client[]>} Array de todos los clientes ordenados por fecha
 * 
 * @description
 * - Simula demora de red de 500ms
 * - Retorna clientes ordenados por fecha de registro (más recientes primero)
 * - En una app real, haría una petición GET /api/clients
 * 
 * @example
 * const clients = await getClients();
 * console.log(`Total de clientes: ${clients.length}`);
 */
export const getClients = async (): Promise<Client[]> => {
  await sleep(500);
  return fakeClients.getClients();
};

/**
 * Obtiene un cliente específico por su ID
 * 
 * @param {string} id - ID del cliente a buscar (formato: C1-XXXXX)
 * @returns {Promise<Client>} El cliente encontrado
 * 
 * @description
 * - Simula demora de red de 500ms
 * - En una app real, haría una petición GET /api/clients/:id
 * 
 * @example
 * const client = await getClient('C1-74999');
 * console.log(client.name); // 'Juan Rodríguez'
 */
export const getClient = async (id: string): Promise<Client> => {
  await sleep(500);
  return fakeClients.getClient(id);
};

/**
 * ================================
 * SECCIÓN DE GESTIÓN DE MENSAJES
 * ================================
 */

/**
 * Almacén interno para simular una base de datos de mensajes
 * 
 * @description
 * Organiza mensajes por cliente usando la estructura:
 * { clientId: Message[] }
 * 
 * Esto permite:
 * - Acceso rápido a mensajes de un cliente específico
 * - Fácil agregado de nuevos mensajes
 * - Simulación realista de conversaciones por cliente
 */
const fakeMessages = {
  // Almacén principal: { clientId: Message[] }
  records: {} as Record<string, Message[]>,
  
  /**
   * Obtiene todos los mensajes de un cliente específico
   * @param {string} clientId - ID del cliente
   * @returns {Message[]} Array de mensajes del cliente (vacío si no tiene)
   */
  getMessages: (clientId: string) => fakeMessages.records[clientId] || [],
  
  /**
   * Obtiene todos los mensajes de todos los clientes ordenados por fecha
   * @returns {Message[]} Todos los mensajes ordenados (más recientes primero)
   */
  getAllMessages: () => {
    return Object.values(fakeMessages.records)
      .flat()
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },
  
  /**
   * Agrega un nuevo mensaje al almacén
   * @param {Message} message - Mensaje a agregar
   */
  addMessage: (message: Message) => {
    if (!fakeMessages.records[message.clientId]) {
      fakeMessages.records[message.clientId] = [];
    }
    fakeMessages.records[message.clientId].push(message);
  },
};

/**
 * Obtiene todos los mensajes de un cliente específico
 * 
 * @param {string} clientId - ID del cliente (formato: C1-XXXXX)
 * @returns {Promise<Message[]>} Array de mensajes del cliente
 * 
 * @description
 * - Simula demora de red de 300ms
 * - Retorna mensajes ordenados por fecha de creación
 * - En una app real, haría una petición GET /api/clients/:id/messages
 * 
 * @example
 * const messages = await getClientMessages('C1-74999');
 * console.log(`${messages.length} mensajes encontrados`);
 */
export const getClientMessages = async (
  clientId: string
): Promise<Message[]> => {
  await sleep(300);
  return fakeMessages.getMessages(clientId);
};

/**
 * Obtiene todos los mensajes de todos los clientes
 * 
 * @returns {Promise<Message[]>} Array con todos los mensajes del sistema
 * 
 * @description
 * - Simula demora de red de 500ms
 * - Útil para dashboards o reportes generales
 * - Mensajes ordenados por fecha (más recientes primero)
 * - En una app real, haría una petición GET /api/messages
 * 
 * @example
 * const allMessages = await getAllMessages();
 * console.log(`Total mensajes en el sistema: ${allMessages.length}`);
 */
export const getAllMessages = async (): Promise<Message[]> => {
  await sleep(500);
  return fakeMessages.getAllMessages();
};

/**
 * Envía un nuevo mensaje al sistema
 * 
 * @param {Omit<Message, 'id' | 'like'>} message - Datos del mensaje sin ID ni like
 * @returns {Promise<Message>} El mensaje creado con ID y like generados
 * 
 * @description
 * - Simula demora de envío de 300ms
 * - Genera automáticamente un ID único (formato: M1-XXXXX)
 * - Establece el like inicial como 'neutral'
 * - Guarda el mensaje en el almacén interno
 * - En una app real, haría una petición POST /api/messages
 * 
 * @example
 * const newMessage = await sendMessage({
 *   clientId: 'C1-74999',
 *   content: 'Hola, necesito ayuda',
 *   createdAt: new Date(),
 *   sender: 'client'
 * });
 * console.log(newMessage.id); // 'M1-12345'
 */
export const sendMessage = async (message: Omit<Message, 'id' | 'like'>) => {
  await sleep(300);
  const newMessage: Message = {
    ...message,
    id: `M1-${Math.floor(10000 + Math.random() * 90000)}`,
    like: 'neutral',
  };
  fakeMessages.addMessage(newMessage);
  return newMessage;
};

/**
 * ================================
 * DATOS DE PRUEBA PRECARGADOS
 * ================================
 */

/**
 * Array de clientes ficticios para poblar la aplicación
 * 
 * @description
 * Contiene 10 clientes de ejemplo con:
 * - Datos realistas de Costa Rica (teléfonos, direcciones)
 * - Diferentes planes de suscripción
 * - Fechas de registro variadas
 * - Emails únicos
 * 
 * @note Estos datos se cargan automáticamente al inicializar el módulo
 */
const clients: Client[] = [
  {
    id: 'C1-74999',
    name: 'Juan Rodríguez',
    email: 'jrodriguez@gmail.com',
    phone: '+506 7952-6056',
    address: 'Calle Principal, San Pedro, San José',
    memberSince: new Date('2023-02-23'),
    currentPlan: Plan.BASIC,
  },
  {
    id: 'C1-81678',
    name: 'María Vargas',
    email: 'mfvargas@outlook.com',
    phone: '+506 6181-6404',
    address: 'Avenida Central, Escazú, San José',
    memberSince: new Date('2022-10-20'),
    currentPlan: Plan.BASIC,
  },
  {
    id: 'C1-60078',
    name: 'Edison Andres',
    email: 'edison.andres@yahoo.com',
    phone: '+57 350 730-9926',
    address: 'Barrio viveros Ibague/tolima',
    memberSince: new Date('2024-01-17'),
    currentPlan: Plan.PRO,
  },
  {
    id: 'C1-68195',
    name: 'Ana Campos',
    email: 'alcampos@hotmail.com',
    phone: '+506 7839-6163',
    address: 'Residencial Los Arcos, Casa 15, Heredia',
    memberSince: new Date('2024-10-17'),
    currentPlan: Plan.PRO,
  },
  {
    id: 'C1-72336',
    name: 'Carlos Mora',
    email: 'camora85@gmail.com',
    phone: '+506 6029-7816',
    address: 'Condominio Valle del Sol, Cartago',
    memberSince: new Date('2024-03-30'),
    currentPlan: Plan.BASIC,
  },
  {
    id: 'C1-91234',
    name: 'Isabel Castro',
    email: 'ijimenez@empresa.co.cr',
    phone: '+506 7102-3987',
    address: 'Barrio Los Yoses, San José',
    memberSince: new Date('2023-06-15'),
    currentPlan: Plan.PREMIUM,
  },
  {
    id: 'C1-56789',
    name: 'Roberto Quirós',
    email: 'rsolano@corporacion.com',
    phone: '+506 6554-7852',
    address: 'Curridabat, 300m Sur del Walmart',
    memberSince: new Date('2022-12-05'),
    currentPlan: Plan.ENTERPRISE,
  },
  {
    id: 'C1-33456',
    name: 'Patricia Wong',
    email: 'pmendez@consultora.net',
    phone: '+506 6883-6594',
    address: 'Residencial Monterán, Santa Ana',
    memberSince: new Date('2023-08-22'),
    currentPlan: Plan.PRO,
  },
  {
    id: 'C1-12987',
    name: 'Diego Chen',
    email: 'dalvarado@tech.cr',
    phone: '+506 6999-5214',
    address: 'Condominio Avalon, Tres Ríos',
    memberSince: new Date('2024-02-10'),
    currentPlan: Plan.PREMIUM,
  },
  {
    id: 'C1-65432',
    name: 'Sofía Blanco',
    email: 'sramirez@grupo.com',
    phone: '+506 7254-8473',
    address: 'Pinares de Curridabat, Casa 78',
    memberSince: new Date('2023-04-28'),
    currentPlan: Plan.ENTERPRISE,
  },
];

/**
 * Carga inicial de clientes al almacén
 * 
 * @description
 * Este forEach se ejecuta cuando se importa el módulo,
 * poblando automáticamente el almacén fakeClients con
 * todos los clientes de prueba definidos arriba.
 */
clients.forEach((client) => {
  fakeClients.setClient(client);
});

/**
 * Array de mensajes ficticios para simular conversaciones reales
 * 
 * @description
 * Contiene conversaciones de ejemplo entre agentes y clientes:
 * - Diferentes tipos de consultas (soporte, ventas, técnico)
 * - Mensajes con diferentes estados de like/dislike
 * - Fechas realistas y secuenciales
 * - Contenido en español apropiado para el contexto costarricense
 * 
 * @note Los mensajes están organizados por cliente para facilitar la lectura
 */
const messages: Message[] = [
  // Juan Rodríguez (C1-74999)
  {
    id: 'M1-12345',
    clientId: 'C1-74999',
    content: 'Hola, necesito información sobre cómo actualizar mi plan actual.',
    createdAt: new Date('2024-05-10T09:30:00'),
    sender: 'client',
    like: 'neutral',
  },
  {
    id: 'M1-12346',
    clientId: 'C1-74999',
    content:
      'Buenos días Juan. Con gusto te puedo ayudar con eso. ¿Estás interesado en cambiar de un plan Básico a otro nivel?',
    createdAt: new Date('2024-05-10T09:35:00'),
    sender: 'agent',
    like: 'liked',
  },
  {
    id: 'M1-12347',
    clientId: 'C1-74999',
    content: 'Sí, me gustaría conocer los beneficios del plan Pro.',
    createdAt: new Date('2024-05-10T09:40:00'),
    sender: 'client',
    like: 'neutral',
  },

  // María Vargas (C1-81678)
  {
    id: 'M1-23456',
    clientId: 'C1-81678',
    content:
      'Tengo problemas para acceder a mi cuenta. Me dice credenciales incorrectas.',
    createdAt: new Date('2024-05-12T14:20:00'),
    sender: 'client',
    like: 'neutral',
  },
  {
    id: 'M1-23457',
    clientId: 'C1-81678',
    content:
      'Lamento escuchar eso, María. Vamos a solucionarlo. ¿Has intentado restablecer tu contraseña?',
    createdAt: new Date('2024-05-12T14:25:00'),
    sender: 'agent',
    like: 'neutral',
  },
  {
    id: 'M1-23458',
    clientId: 'C1-81678',
    content: 'Sí, pero no recibo el correo de restablecimiento.',
    createdAt: new Date('2024-05-12T14:30:00'),
    sender: 'client',
    like: 'neutral',
  },
  {
    id: 'M1-23459',
    clientId: 'C1-81678',
    content:
      'Entiendo. Acabo de enviar manualmente un enlace de restablecimiento a tu correo. Por favor revisa también la carpeta de spam.',
    createdAt: new Date('2024-05-12T14:35:00'),
    sender: 'agent',
    like: 'liked',
  },

  // José Hernández (C1-60078)
  {
    id: 'M1-34567',
    clientId: 'C1-60078',
    content:
      '¿Cuáles son las nuevas características del plan Pro que contraté?',
    createdAt: new Date('2024-05-15T11:10:00'),
    sender: 'client',
    like: 'neutral',
  },
  {
    id: 'M1-34568',
    clientId: 'C1-60078',
    content:
      'Hola Edison. El plan Pro incluye soporte prioritario, acceso a herramientas avanzadas de análisis y 50GB de almacenamiento adicional.',
    createdAt: new Date('2024-05-15T11:15:00'),
    sender: 'agent',
    like: 'liked',
  },

  // Roberto Quirós (C1-56789)
  {
    id: 'M1-45678',
    clientId: 'C1-56789',
    content:
      'Necesitamos agregar 5 usuarios más a nuestra cuenta Enterprise. ¿Cuál es el proceso?',
    createdAt: new Date('2024-05-18T16:45:00'),
    sender: 'client',
    like: 'neutral',
  },
  {
    id: 'M1-45679',
    clientId: 'C1-56789',
    content:
      'Buenas tardes Roberto. Para agregar usuarios adicionales a su plan Enterprise, puede hacerlo directamente desde el panel de administración o puedo asistirle con el proceso.',
    createdAt: new Date('2024-05-18T16:50:00'),
    sender: 'agent',
    like: 'neutral',
  },
  {
    id: 'M1-45680',
    clientId: 'C1-56789',
    content: 'Preferiría que me asista, por favor.',
    createdAt: new Date('2024-05-18T16:55:00'),
    sender: 'client',
    like: 'neutral',
  },
  {
    id: 'M1-45681',
    clientId: 'C1-56789',
    content:
      'Con gusto. Necesitaré los nombres y correos electrónicos de los nuevos usuarios. ¿Los tiene disponibles ahora?',
    createdAt: new Date('2024-05-18T17:00:00'),
    sender: 'agent',
    like: 'liked',
  },

  // Sofía Blanco (C1-65432)
  {
    id: 'M1-56789',
    clientId: 'C1-65432',
    content:
      'Estamos considerando actualizar a un plan con más capacidad. ¿Qué nos recomiendan?',
    createdAt: new Date('2024-05-20T10:15:00'),
    sender: 'client',
    like: 'neutral',
  },
  {
    id: 'M1-56790',
    clientId: 'C1-65432',
    content:
      'Buenos días Sofía. Basado en el uso actual de su cuenta Enterprise, están utilizando eficientemente los recursos. Sin embargo, si planean expandirse en los próximos meses, podríamos discutir opciones personalizadas.',
    createdAt: new Date('2024-05-20T10:20:00'),
    sender: 'agent',
    like: 'liked',
  },
  {
    id: 'M1-56791',
    clientId: 'C1-65432',
    content:
      'Excelente. Tenemos planes de crecer un 30% este trimestre. ¿Podríamos agendar una llamada para discutir opciones?',
    createdAt: new Date('2024-05-20T10:25:00'),
    sender: 'client',
    like: 'liked',
  },

  // Diego Chen (C1-12987)
  {
    id: 'M1-67890',
    clientId: 'C1-12987',
    content:
      'La nueva actualización está causando lentitud en nuestro sistema. ¿Hay alguna solución?',
    createdAt: new Date('2024-05-22T13:40:00'),
    sender: 'client',
    like: 'neutral',
  },
  {
    id: 'M1-67891',
    clientId: 'C1-12987',
    content:
      'Lamento escuchar eso, Diego. Estamos al tanto de algunos problemas de rendimiento con la última actualización. Nuestro equipo técnico está trabajando en una solución que estará disponible en las próximas 24 horas.',
    createdAt: new Date('2024-05-22T13:45:00'),
    sender: 'agent',
    like: 'neutral',
  },
  {
    id: 'M1-67892',
    clientId: 'C1-12987',
    content:
      'Entiendo, pero esto está afectando nuestras operaciones. ¿Hay alguna solución temporal que podamos implementar?',
    createdAt: new Date('2024-05-22T13:50:00'),
    sender: 'client',
    like: 'neutral',
  },
  {
    id: 'M1-67893',
    clientId: 'C1-12987',
    content:
      'Por supuesto. Le recomendaría reiniciar el servicio y limitar el procesamiento en segundo plano temporalmente. Puedo guiarle a través de estos pasos si lo desea.',
    createdAt: new Date('2024-05-22T13:55:00'),
    sender: 'agent',
    like: 'disliked',
  },
  {
    id: 'M1-67894',
    clientId: 'C1-12987',
    content: 'Sí, por favor guíeme a través del proceso.',
    createdAt: new Date('2024-05-22T14:00:00'),
    sender: 'client',
    like: 'neutral',
  },
];

/**
 * Carga inicial de mensajes al almacén
 * 
 * @description
 * Este forEach se ejecuta cuando se importa el módulo,
 * poblando automáticamente el almacén fakeMessages con
 * todas las conversaciones de prueba definidas arriba.
 * 
 * Los mensajes se organizan por clientId para permitir
 * búsquedas eficientes por cliente.
 */
messages.forEach((message) => {
  fakeMessages.addMessage(message);
});
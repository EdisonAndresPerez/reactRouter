/**
 * @fileoverview Utilidad para simular demoras asíncronas
 * 
 * Este archivo contiene funciones utilitarias para simular
 * operaciones asíncronas con demoras controladas, útil para:
 * - Simular llamadas a API
 * - Testing de interfaces de carga
 * - Simulación de latencia de red
 * 
 * @author Tu Equipo de Desarrollo
 * @version 1.0.0
 */

/**
 * Función que simula una demora asíncrona
 * 
 * @param {number} ms - Cantidad de milisegundos a esperar
 * @returns {Promise<void>} Promise que se resuelve después del tiempo especificado
 * 
 * @description
 * Utiliza setTimeout dentro de una Promise para crear una demora no bloqueante.
 * Es especialmente útil para simular el comportamiento de APIs reales en desarrollo.
 * 
 * @example
 * // Simular una demora de 1 segundo
 * await sleep(1000);
 * console.log('Han pasado 1000ms');
 * 
 * @example
 * // Uso en una función asíncrona
 * const fetchData = async () => {
 *   console.log('Iniciando solicitud...');
 *   await sleep(500); // Simular latencia de red
 *   console.log('Datos recibidos');
 *   return data;
 * };
 */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
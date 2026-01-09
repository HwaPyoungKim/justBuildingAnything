//DB en memoria a modo de prueba
export const tasks = [];

let nextId = 1;

export function getNextId() {
  return nextId++;
}
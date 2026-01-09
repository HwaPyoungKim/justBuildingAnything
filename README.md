# Simple CRUD API – Tasks

API REST simple para aprender la estructura de un **CRUD** usando **Node.js + Express**.  
La persistencia es **en memoria** (sin base de datos), pensada con fines educativos.

---

## 🚀 Stack
- Node.js (ES Modules)
- Express
- Nodemon (desarrollo)

---

### 1️⃣ Instalar dependencias
```bash
npm install
```
### 2️⃣ Instalar dependencias
```bash
npm run dev
http://localhost:3000
```

### ❤️ Health Check
```bash
GET /health
```
Response
```bash
{
  "ok": true
}
```
### 📌 Recurso: Task
Modelo
```bash
{
  "id": number,
  "title": string,
  "done": boolean
}

### 📘 Endpoints
#### ➕ Crear una task
```bash
POST /tasks
```

##### Body
```bash
{
  "title": "Comprar leche",
  "done": false
}
```

##### Response – 201 Created
```bash
{
  "id": 1,
  "title": "Comprar leche",
  "done": false
}
```
### 📄 Listar todas las tasks
```bash
GET /tasks
```

##### Response – 200 OK
```bash
[
  {
    "id": 1,
    "title": "Comprar leche",
    "done": false
  }
]
```
### 🔍 Obtener una task por ID
```bash
GET /tasks/:id
```

##### Response – 200 OK
```bash
{
  "id": 1,
  "title": "Comprar leche",
  "done": false
}
```

##### Errores posibles

- 400 Bad Request → id inválido

- 404 Not Found → task no encontrada

### ✏️ Reemplazar una task (PUT)
```bash
PUT /tasks/:id
```

##### Body
```bash
{
  "title": "Comprar pan",
  "done": true
}
```

##### Response – 200 OK
```bash
{
  "id": 1,
  "title": "Comprar pan",
  "done": true
}
```
### 🩹 Actualizar parcialmente una task (PATCH)
```bash
PATCH /tasks/:id
```

##### Body (ejemplo)
```bash
{
  "done": true
}
```

##### Response – 200 OK
```bash
{
  "id": 1,
  "title": "Comprar leche",
  "done": true
}
```
### 🗑 Eliminar una task
```bash
DELETE /tasks/:id
```

##### Response – 204 No Content

### ❌ Errores comunes
##### 400 – Bad Request
```bash
{
  "error": "title debe ser un string no vacío"
}
```
##### 404 – Not Found
```bash
{
  "error": "task no encontrada"
}
```
###⚠️ Persistencia
-Los datos se guardan en memoria
-Se pierden al reiniciar el servidor
-No usar en producción

###🎯 Objetivo del proyecto
-Entender la estructura de una API REST
-Separación de responsabilidades (routes / controllers / data)
-Uso correcto de HTTP status codes
-Modularización y helpers

###🛠 Posibles mejoras
-Agregar capa services
-Conectar base de datos (PostgreSQL / MongoDB)
-Validaciones de datos
-Manejo centralizado de errores

Autenticación (JWT)

Tests automáticos

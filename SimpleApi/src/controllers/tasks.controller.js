import * as db from "../data/tasks.db.js";

/**
 * Helpers / utilidades
 */

function parseId(req) {
  const id = Number(req.params.id);
  return Number.isFinite(id) ? id : null;
}

function badRequest(res, message) {
  return res.status(400).json({ error: message });
}

function notFound(res, message = "task no encontrada") {
  return res.status(404).json({ error: message });
}

function validateTitle(title) {
  return typeof title === "string" && title.trim() !== "";
}

function validateDone(done) {
  return typeof done === "boolean";
}

function findTaskIndexById(id) {
  return db.tasks.findIndex((t) => t.id === id);
}

function getTaskByIdOr404(res, id) {
  const idx = findTaskIndexById(id);
  if (idx === -1) return { idx: -1, task: null, handled: notFound(res) };
  return { idx, task: db.tasks[idx], handled: null };
}

function validateCreateBody(res, body) {
  const { title, done } = body;

  if (!validateTitle(title)) {
    return { ok: false, handled: badRequest(res, "title debe ser un string no vacío") };
  }
  if (done !== undefined && !validateDone(done)) {
    return { ok: false, handled: badRequest(res, "done debe ser boolean (si se envía)") };
  }

  return { ok: true, handled: null };
}

function validatePutBody(res, body) {
  const { title, done } = body;

  if (!validateTitle(title)) {
    return { ok: false, handled: badRequest(res, "title debe ser un string no vacío") };
  }
  if (!validateDone(done)) {
    return { ok: false, handled: badRequest(res, "done debe ser boolean") };
  }

  return { ok: true, handled: null };
}

function applyPatch(res, task, body) {
  const { title, done } = body;

  if (title !== undefined) {
    if (!validateTitle(title)) {
      return { ok: false, handled: badRequest(res, "title debe ser un string no vacío") };
    }
    task.title = title.trim();
  }

  if (done !== undefined) {
    if (!validateDone(done)) {
      return { ok: false, handled: badRequest(res, "done debe ser boolean") };
    }
    task.done = done;
  }

  return { ok: true, handled: null };
}

// POST /tasks
export function createTask(req, res) {
  const validation = validateCreateBody(res, req.body);
  if (!validation.ok) return validation.handled;

  const { title, done } = req.body;

  const newTask = {
    id: db.nextId++,
    title: title.trim(),
    done: done ?? false,
  };

  db.tasks.push(newTask);
  return res.status(201).json(newTask);
}

// GET /tasks
export function listTasks(req, res) {
  return res.json(db.tasks);
}

// GET /tasks/:id
export function getTaskById(req, res) {
  const id = parseId(req);
  if (id === null) return badRequest(res, "id inválido");

  const { task, handled } = getTaskByIdOr404(res, id);
  if (handled) return handled;

  return res.json(task);
}

// PUT /tasks/:id
export function updateTaskPut(req, res) {
  const id = parseId(req);
  if (id === null) return badRequest(res, "id inválido");

  const { idx, handled } = getTaskByIdOr404(res, id);
  if (handled) return handled;

  const validation = validatePutBody(res, req.body);
  if (!validation.ok) return validation.handled;

  const { title, done } = req.body;

  const updated = {
    id,
    title: title.trim(),
    done,
  };

  db.tasks[idx] = updated;
  return res.json(updated);
}

// PATCH /tasks/:id
export function updateTaskPatch(req, res) {
  const id = parseId(req);
  if (id === null) return badRequest(res, "id inválido");

  const { task, handled } = getTaskByIdOr404(res, id);
  if (handled) return handled;

  const patch = applyPatch(res, task, req.body);
  if (!patch.ok) return patch.handled;

  return res.json(task);
}

// DELETE /tasks/:id
export function deleteTask(req, res) {
  const id = parseId(req);
  if (id === null) return badRequest(res, "id inválido");

  const idx = findTaskIndexById(id);
  if (idx === -1) return notFound(res);

  db.tasks.splice(idx, 1);
  return res.status(204).send();
}

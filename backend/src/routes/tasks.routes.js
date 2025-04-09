const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

const authMiddleware = require("../middlewares/auth.middleware");

// // Lista de tareas (por ahora simuladas en memoria)
// let tasks = [
// { id: 1, title: "Aprender Node.js", completed: false },
// { id: 2, title: "Configurar Express", completed: true }
// ];
// // Obtener todas las tareas
// router.get('/tasks', (req, res) => {
//     res.json(tasks);
//     });
//     // Agregar una nueva tarea
//     router.post('/tasks', (req, res) => {
//     const { title } = req.body;
//     if (!title) return res.status(400).json({ error: "El título es obligatorio" });
//     const newTask = { id: tasks.length + 1, title, completed: false };
//     tasks.push(newTask);
//     res.json(newTask);
//     });
//     // Marcar una tarea como completada
//     router.put('/tasks/:id', (req, res) => {
//     const { id } = req.params;
//     const task = tasks.find(t => t.id == id);
//     if (!task) return res.status(404).json({ error: "Tarea no encontrada" });
//     task.completed = !task.completed;
//     res.json(task);
//     });
//     // Eliminar una tarea
//     router.delete('/tasks/:id', (req, res) => {
//     const { id } = req.params;
//     tasks = tasks.filter(t => t.id != id);
//     res.json({ message: "Tarea eliminada" });
//     });
//     module.exports = router;

router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

router.post("/", authMiddleware, async (req, res) => {
  const { title } = req.body;
  const task = new Task({ title, completed: false, userId: req.userId });
  await task.save();
  res.status(201).json(task);
});

// Obtener todas las tareas
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});
// Agregar una nueva tarea
router.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title)
      return res.status(400).json({ error: "El título es obligatorio" });
    const newTask = new Task({ title });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
});
// Marcar una tarea como completada
router.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ error: "Tarea no encontrada" });
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
});
// Eliminar una tarea
router.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
});
module.exports = router;

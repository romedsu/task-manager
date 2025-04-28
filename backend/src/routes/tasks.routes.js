const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

const authMiddleware = require("../middlewares/auth.middleware");

//tasks de usuario logueado
router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

// router.post("/", authMiddleware, async (req, res) => {
//   const { title } = req.body;
//   const task = new Task({ title,description, completed: false, userId: req.userId });
//   await task.save();
//   res.status(201).json(task);
// });

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, dateFinal } = req.body;
    const task = new Task({
      title,
      description,
      completed: false,
      userId: req.userId,
      dateFinal,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    res.status(500).json({ error: "Error al crear la tarea" });
  }
});

// Obtener todas las tareas (de todos los usuarios)
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

// // Agregar una nueva tarea
// router.post("/tasks", async (req, res) => {

//   try {
//     const { title } = req.body;

//     if (!title)
//       return res.status(400).json({ error: "El título es obligatorio" });
//     const newTask = new Task({ title });
//     await newTask.save();
//     res.json(newTask);
//   } catch (error) {
//     res.status(500).json({ error: "Error al crear la tarea" });
//   }
// });

// Marcar una tarea como completada
router.put("/tasks/:id/completed", async (req, res) => {
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

//EDITAR tarea
// patch --> por que solo se va a editar unos campos en concreto, no todo el recurso
router.patch("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    if (title !== undefined) {
      task.title = title;
    }

    if (description !== undefined) {
      task.description = description;
    }

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

//like
router.put("/tasks/:id/liked", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ error: "Tarea no encontrada" });
    task.liked = !task.liked;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
});

module.exports = router;

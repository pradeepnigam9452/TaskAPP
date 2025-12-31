import express from "express";
import Task from "../models/Task.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// ✅ Get all tasks of logged-in user
router.get("/",auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// api/tasks 


router.post("/", auth, async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status,
      userId: req.user.userId,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});


router.put("/:taskId", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.taskId, userId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Delete a task
router.delete("/:taskId", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.taskId,
      userId: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// // ✅ Get tasks by status
// router.get("/status/:status",  async (req, res) => {
//   try {
//     const tasks = await Task.find({
//       userId: req.user.userId,
//       status: req.params.status,
//     });
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // ✅ Update task
// router.put("/:taskId", async (req, res) => {
//   try {
//     const task = await Task.findOneAndUpdate(
//       { _id: req.params.taskId, userId: req.user.userId },
//       req.body,
//       { new: true }
//     );

//     if (!task) {
//       return res.status(404).json({ message: "Task not found or unauthorized" });
//     }

//     res.json(task);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // ✅ Delete task
// router.delete("/:taskId", async (req, res) => {
//   try {
//     const task = await Task.findOneAndDelete({
//       _id: req.params.taskId,
//       userId: req.user.userId,
//     });

//     if (!task) {
//       return res.status(404).json({ message: "Task not found or unauthorized" });
//     }

//     res.json({ message: "Task deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

export default router;



import { Router } from "express";

import { createTodo, deleteTodo, getTodos, updateTodo, getTodoById, countTodo } from "../controllers/todos";

const router = Router();

router.post("/", createTodo);

router.get("/", getTodos);

router.patch("/:id", getTodoById);

router.delete("/:id", deleteTodo);

//action for find
// router.get("/:id", getTodoById);

//action for count element in todolist
router.get("/count", countTodo);

export default router;

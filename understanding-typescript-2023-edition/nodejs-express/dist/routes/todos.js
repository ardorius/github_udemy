"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const router = (0, express_1.Router)();
router.post("/", todos_1.createTodo);
router.get("/", todos_1.getTodos);
router.patch("/:id", todos_1.getTodoById);
router.delete("/:id", todos_1.deleteTodo);
//action for find
// router.get("/:id", getTodoById);
//action for count element in todolist
router.get("/count", todos_1.countTodo);
exports.default = router;

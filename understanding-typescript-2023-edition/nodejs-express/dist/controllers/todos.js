"use strict";
// 194. Working with Controllers & Parsing Request Bodies
Object.defineProperty(exports, "__esModule", { value: true });
exports.countTodo = exports.getTodoById = exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const TODOS = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: 'Created the todo.', createTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json({ todos: TODOS });
};
exports.getTodos = getTodos;
// 195. More CRUD Operations
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error("Cound not find todo!");
    }
    TODOS[todoIndex] = new todo_1.Todo(TODOS[todoIndex].id, updatedText);
    res.json({ message: 'Updated!', updateTodo: TODOS[todoIndex] });
};
exports.updateTodo = updateTodo;
//detele Todo by url params id
//write description of deteleTodo method
/**
 *
 * @param req
 * @param res
 * @param next
 */
const deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error("Cound not find todo!");
    }
    TODOS.splice(todoIndex, 1);
    res.json({ message: 'Todo deleted!' });
};
exports.deleteTodo = deleteTodo;
//check if element exist it Todo by url params id
const getTodoById = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error("Cound not find todo!");
    }
    res.json({ message: 'Found todoxx!', todo: TODOS[todoIndex] });
};
exports.getTodoById = getTodoById;
//count element in Todo list
const countTodo = (req, res, next) => {
    res.json({ message: 'Count todo!', count: TODOS.length });
};
exports.countTodo = countTodo;

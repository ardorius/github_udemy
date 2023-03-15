// 194. Working with Controllers & Parsing Request Bodies

import { RequestHandler } from "express";

import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (
  req,
  res,
  next
) => {
    const text = (req.body as {text: string}).text;
    const newTodo = new Todo(Math.random().toString(), text);

    TODOS.push(newTodo);

    res.status(201).json({message: 'Created the todo.', createTodo: newTodo});
};

export const getTodos: RequestHandler = (req, res, next) => {
    res.json({todos: TODOS})
};

// 195. More CRUD Operations
export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id;

    const updatedText = (req.body as {text: string}).text;

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

    if (todoIndex < 0) {
        throw new Error("Cound not find todo!");
    }

    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

    res.json({message: 'Updated!', updateTodo: TODOS[todoIndex]}); 
};

//detele Todo by url params id

//write description of deteleTodo method
/**
 * 
 * @param req
 * @param res 
 * @param next 
 */
export const deleteTodo: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id;

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

    if (todoIndex < 0) {
        throw new Error("Cound not find todo!");
    }

    TODOS.splice(todoIndex, 1);

    res.json({message: 'Todo deleted!'});
}

//check if element exist it Todo by url params id
export const getTodoById: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id;

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);

    if (todoIndex < 0) {
        throw new Error("Cound not find todo!");
    }

    res.json({message: 'Found todoxx!', todo: TODOS[todoIndex]});
}

//count element in Todo list
export const countTodo: RequestHandler = (req, res, next) => {

    res.json({message: 'Count todo!', count: TODOS.length});
}
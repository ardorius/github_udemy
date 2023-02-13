// 192. Finished Setup & Working with Types (in Node + Express Apps)

import express, { Request, Response, NextFunction } from "express";
import {json} from 'body-parser';


import todoRoutes from "./routes/todos";

const app = express();

app.use(json());

app.use("/todos", todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});
//port:3000
app.listen(3000);

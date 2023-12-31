import express from "express";

import morgan from "morgan";
import tourRouter from "./routes/tours.routes";
import userRouter from "./routes/users.routes";

const app = express();

/* MIDDLEWARE **/
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

/* ROUTES **/
const baseUrl = "/api/v1";

app.use(`${baseUrl}/tours`, tourRouter);
app.use(`${baseUrl}/users`, userRouter);

app.use(express.static(`${__dirname}/public`));

export default app;

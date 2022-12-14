import "reflect-metadata";
import "express-async-errors";
import express from "express";
import userRoutes from "./routes/user.routes";
import sessionRoutes from "./routes/session.routes";
import handleAppErrorMiddleware from "./middlewares/handleAppError.middleware";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", sessionRoutes);

app.use(handleAppErrorMiddleware);

app.listen(3000, () => {
  console.log("App runing");
});

export default app;

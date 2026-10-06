import { connectDB, synchronization } from "./DB/connections.js";
import { commentRouter, postRouter, userRouter } from "./modules/index.js";
export const bootstrap = async (app, express) => {
  app.use(express.json());

  await connectDB();
  await synchronization();

  app.use("/api/v1/users" , userRouter);
  app.use("/api/v1/posts" , postRouter);
  app.use("/api/v1/comments" , commentRouter);
  app.all("/*demo", (req, res) => {
    res.status(404).json({ message: "handler is not found!!!!!!!!" });
  });
};

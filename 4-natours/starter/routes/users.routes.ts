import { Router } from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} from "../controller/users.controller";

const userRouter = Router();

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

export default userRouter;

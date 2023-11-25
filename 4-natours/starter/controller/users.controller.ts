import { Request, Response } from "express";

const getAllUsers = (_: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined"
  });
};

const getUserById = (_: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined"
  });
};

const createUser = (_: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined"
  });
};

const updateUser = (_: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined"
  });
};

const deleteUser = (_: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined"
  });
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };

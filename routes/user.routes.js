import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controller/user.controller.js";
import validateJwt from "../utils/validateToken.js";

const router = express.Router();

router.post("/user", createUser);

router.get("/user/:id", validateJwt, getUser);

router.put("/user/:id", validateJwt, updateUser);

router.delete("/user/:id", validateJwt, deleteUser);

export default router;

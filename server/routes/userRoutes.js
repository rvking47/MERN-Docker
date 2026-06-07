import express from 'express';
import { getUsers, createUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.post('/', createUser);

export default userRouter;
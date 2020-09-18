import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const userRoutes = Router();

userRoutes.post('/', UsersController.store);

export default userRoutes;

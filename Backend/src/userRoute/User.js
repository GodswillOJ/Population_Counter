import express from 'express';
import * as userController from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/authenticateToken.js';

const userRouter = express.Router();

userRouter.use(express.urlencoded({ extended: true }));
userRouter.use(express.json());

userRouter.post('/registerUser', userController.insertUser);
userRouter.get('/addToPop', isAuthenticated, userController.fetchUserData);
userRouter.post('/addToPop', userController.insertPopulation);
userRouter.post('/login', userController.LoginVerify);

userRouter.get('/dashboard', isAuthenticated, userController.fetchUserData); // Route to fetch user data for the dashboard

userRouter.get('/', userController.Home);

export { userRouter };

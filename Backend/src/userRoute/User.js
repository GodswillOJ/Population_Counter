// userRouter.js
import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const userRouter = express.Router();

userRouter.use(express.urlencoded({ extended: true }));
userRouter.use(express.json());

// API for registered users
userRouter.post('/registerUser', userController.insertUser);

// API for populated users
userRouter.post('/addToPop',authenticateToken, userController.insertPopulation);

userRouter.post('/login', userController.LoginVerify);

userRouter.get('/dashboard', authenticateToken, userController.LoadDashboard);

userRouter.get('/', authenticateToken, userController.Home);

export { userRouter };

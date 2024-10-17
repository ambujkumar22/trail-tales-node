import express from 'express';
import { createUser, loginUser } from '../controllers/user.controller.js';
const router = express.Router();

router.post('/login', (req, res) => {
    loginUser(req, res);
});

router.post('/register', (req, res) => {
    createUser(req, res);
});

router.post('/forgot-password', (req, res) => {
    res.status(200).send({ status: "success", message: "Forgot password" });
});

export default router;
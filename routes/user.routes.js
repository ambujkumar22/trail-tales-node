import express from 'express';
import { fetchUser } from '../controllers/user.controller.js';
import { verifyToken } from '../libs/middleware/authenticated.js';
const router = express.Router();

router.get('/profile/:id', verifyToken, (req, res) => {
    fetchUser(req, res);
});

router.post('/profile-edit', (req, res) => {
    res.status(200).send({ status: "success", message: "User profile Edit" });
});

export default router;
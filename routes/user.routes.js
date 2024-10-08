import express from 'express';
import { createUser, fetchUser } from '../controllers/user.controller.js';
const router = express.Router();

router.get('/profile/:id', (req, res) => {
    fetchUser(req, res);
});

router.post('/profile-create', (req, res) => {
    createUser(req, res);
});

router.post('/profile-edit', (req, res) => {
    res.status(200).send({ status: "success", message: "User profile Edit" });
});

export default router;
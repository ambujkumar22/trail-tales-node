import express from 'express';
const router = express.Router();

router.post('/login', (req, res) => {
    res.status(200).send({ status: "success", message: "Login" });
});

router.post('/register', (req, res) => {
    res.status(200).send({ status: "success", message: "Register" });
});

router.post('/forgot-password', (req, res) => {
    res.status(200).send({ status: "success", message: "Forgot password" });
});

export default router;
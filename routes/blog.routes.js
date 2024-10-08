import express from 'express';
const router = express.Router();

router.get('/blogs', (req, res) => {
    res.status(200).send({ status: "success", message: "all blogs list" });
});

router.get('/blog/:id', (req, res) => {
    res.status(200).send({ status: "success", message: "single blog" });
});

router.post('/create-blog', (req, res) => {
    res.status(200).send({ status: "success", message: "create blog" });
});

router.patch('/edit-blog', (req, res) => {
    res.status(200).send({ status: "success", message: "edit blog" });
});

router.delete('/delete-blog', (req, res) => {
    res.status(200).send({ status: "success", message: "delete blog" });
});

export default router;
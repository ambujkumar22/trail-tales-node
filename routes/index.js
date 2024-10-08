import express from 'express';
import blogRouters from './blog.routes.js';
import authRouters from './auth.routes.js';
import userRouters from './user.routes.js';
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Trailing tales');
});

app.use('/', blogRouters);

app.use('/', authRouters);

app.use('/', userRouters);

app.use((req, res, next) => {
    res.status(400).send({ status: "error", message: "route not found" });
});

export default app;
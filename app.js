import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import routes from './routes/index.js';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// app routing
app.use('/', routes);

// port connect to server
app.listen(port, () => {
    console.log("Server started on http://localhost:3000");
});
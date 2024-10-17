import bcrypt from "bcryptjs/dist/bcrypt.js";
import User from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (name && email && password) {
            let payload = {
                name,
                email,
                password
            }

            const response = await User.create(payload);
            if (response.status) {
                return res.status(409).send(response);
            }

            res.status(200).send({ status: "success", message: "User created successfully", data: response });
        } else {
            res.status(400).send({ status: "error", message: "Required fields missing" });
        }
    } catch (error) {
        res.status(400).send({ status: "error", message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email && password) {
            const user = await User.fetch({ email });
            if (!user) return res.status(400).send({ status: "error", message: 'Username or password is wrong' });

            // Compare passwords
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.status(400).send({ status: "error", message: 'Username or password is wrong' });

            delete user.password;

            const token = jsonwebtoken.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

            res.status(200).send({ status: "success", message: "Login successful", data: {...user, token} });
        } else {
            res.status(400).send({ status: "error", message: "Required fields missing" });
        }
    } catch (error) {
        res.status(400).send({ status: "error", message: error.message });
    }
}

const fetchUser = async (req, res) => {
    try {
        const id = req.params.id ?? '';
        if (id) {
            const response = await User.fetch({id});
            if (!response) return res.status(400).send({ status: "error", message: "User not found" });

            delete response.password;
            res.status(200).send({ status: "success", message: "Successfully fetch user data", data: response });
        } else {
            res.status(400).send({ status: "error", message: "Required fields missing" });
        }
    } catch (error) {
        res.status(400).send({ status: "error", message: error.message });
    }
}

export { createUser, fetchUser, loginUser };
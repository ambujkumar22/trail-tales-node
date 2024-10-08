import User from "../model/user.model.js";

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (name && email && password) {
            let payload = {
                name,
                email,
                password
            }

            const response = await User.createUser(payload);
            if (response.status) {
                res.status(409).send(response);
            }

            res.status(200).send({ status: "success", message: "create user", data: response });
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
            const response = await User.fetch(id);
            res.status(200).send({ status: "success", message: "fetch user", data: response });
        } else {
            res.status(400).send({ status: "error", message: "Required fields missing" });
        }
    } catch (error) {
        res.status(400).send({ status: "error", message: error.message });
    }
}

export { createUser, fetchUser };
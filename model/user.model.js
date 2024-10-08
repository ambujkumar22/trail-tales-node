import db from "../database/db-connection.js";
import bcrypt from "bcrypt";

const User = {
    createUser: async ({...args}) => {
        let { name, email, password, role = 'user' } = args;
        // Check if user already exists
        const existingUser = await new Promise((resolve, reject) => {
            db.get(`SELECT id FROM users WHERE email = ?`, [email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
        
        if (existingUser) {
            return { status: "error", message: "Email already exists" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
        const params = [name, email, hashedPassword, role];

        const result = await new Promise((resolve, reject) => {
            db.run(query, params, function (err) {
                if (err) {
                    reject(err); // Reject the promise if there was an error
                } else {
                    let userData = { id: this.lastID, name, email, role };
                    resolve(userData);
                }
            });
        });

        return result;
    },
    fetch: async (id = '') => {
        const query = `SELECT id,name,email,role FROM users WHERE id = ?`;
        const params = [id];
        const result = await new Promise((resolve, reject) => {
            db.get(query, params, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    
                    resolve(row);
                }
            });
        });

        return result;
    }
};

export default User;
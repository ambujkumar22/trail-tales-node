import sqlite3 from 'sqlite3';

// Create a new database object
const db = new sqlite3.Database('database/trail-tales.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the blog database.');
});

// Export the database object
export default db;
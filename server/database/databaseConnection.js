import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve('database', 'data.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error when connect database:', err.message);
    } else {
        console.log(`Connect SQLite successful ${dbPath}`);
    }
});

export default db;

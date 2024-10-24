import fs from 'fs';
import db from "../database/databaseConnection.js";
import path from 'path';
import { incrementSearchCount } from "./popularModel.js";

export function checkAndInsertTerms() {
    db.get(`SELECT COUNT(*) as count FROM terms`, (err, row) => {
        if (err) {
            console.error('Error querying row count:', err.message);
            createDatabase();
            return;
        }

        console.log(`Current row count: ${row.count}`);

        if (row.count === 176023) {
            console.log('The table terms already contains 176,023 rows. No insertion is needed.');
        } else {
            console.log('Row count is incorrect. Recreating the table and inserting data.');
            createDatabase();
        }
    });
}

export function createDatabase() {
    recreateTable(() => {
        const jsonPath = path.resolve('', 'englishdictionary.json');
        const jsonData = loadJsonHelper(jsonPath);
        const terms = jsonData.entries;
        insertTerms(terms);
    });
}

export function recreateTable(callback) {
    db.serialize(() => {
        db.run(`DROP TABLE IF EXISTS terms`, (err) => {
            if (err) {
                console.error('Error dropping table:', err.message);
                return;
            }
            console.log('Dropped existing table.');

            db.run(`
                CREATE TABLE terms (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    word TEXT,
                    wordtype TEXT,
                    definition TEXT
                )
            `, (err) => {
                if (err) {
                    console.error('Error creating table:', err.message);
                    return;
                }
                console.log('Table recreated successfully.');
                callback();
            });
        });
    });
}

export function insertTerms(terms) {

    const insertStatement = db.prepare(`INSERT INTO terms(word, wordtype, definition) VALUES (?, ?, ?)`);
    let rows = 0;
    let rowsSkip = 0;
    terms.forEach((e) => {
        if (e.word !== null && e.word !== '' && e.definition !== null) {
            insertStatement.run(e.word, e.wordtype || null, e.definition);
            rows++;
        } else {
            rowsSkip++;
        }
    });

    insertStatement.finalize(() => {
        console.log(`Data inserted successfully ${rows} rows, skipped ${rowsSkip} rows`)
    })
}

export function searchTerm(query, callback) {
    const queryStatement = `SELECT * FROM terms WHERE word = ? COLLATE NOCASE LIMIT 100;`;
    db.all(queryStatement, query, (err, rows) => {
        if (err) {
            console.error('Error executing query:', err.message);
            callback(err, null);
            return;
        }
        if (rows != null && rows.length > 0) {
            // Increment the search count for the found word
            incrementSearchCount(query, (err) => {
                if (err) {
                    callback(err, null);
                    console.log(`Data selected successfully: ${rows.length} rows found`);
                } else {
                    console.log(' found.');
                    callback(null, rows);
                }
            });
        } else {
            console.log('No matching term found.');
            callback('NOT_FOUND', null);
        }
    });
}


function loadJsonHelper(path) {
    const rawData = fs.readFileSync(path, 'utf8')
    return JSON.parse(rawData);
}
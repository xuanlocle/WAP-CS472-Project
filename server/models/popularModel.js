import db from "../database/databaseConnection.js";

export default function createSearchCountsTable() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS search_counts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            word TEXT UNIQUE NOT NULL,
            popular INTEGER DEFAULT 0
        );
    `;

    db.run(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating search_counts table:', err.message);
        } else {
            console.log('Successfully created search_counts table.');
            insertDefaultRows();
        }
    });
}

function insertDefaultRows() {
    const insertQuery = `
        INSERT INTO search_counts (word, popular) VALUES (?, ?)
        ON CONFLICT(word) DO NOTHING;
    `;

    const defaultRows = [
        ['address', 0],
        ['bear', 0],
        ['the', 0],
        ['schedule', 0],
        ['book', 0],
        ['content', 0],
        ['work', 0],
        ['run', 0],
        ['pronunciation', 0],
        ['experience', 0]
    ];

    defaultRows.forEach(([word, popular]) => {
        db.run(insertQuery, [word, popular], (err) => {
            if (err) {
                console.error(`Error inserting word "${word}":`, err.message);
            } else {
                //do nothing
            }
        });
        console.log(`Inserted default word "${word}" with popularity ${popular}`);

    });
}

export function incrementSearchCount(word, callback) {
    const updateOrInsertQuery = `
        INSERT INTO search_counts (word, popular)
        VALUES (?, 1)
        ON CONFLICT(word) DO UPDATE SET popular = popular + 1;
    `;

    db.run(updateOrInsertQuery, [word.trim()], (err) => {
        if (err) {
            console.error('Error updating search count:', err.message);
            if (callback) callback(err);
        } else {
            console.log(`Search count incremented for word: ${word}`);
            if (callback) callback(null);
        }
    });
}

export function getPopularTerms(callback) {
    const queryStatement = `SELECT word, popular FROM search_counts ORDER BY popular DESC LIMIT 10;`;
    db.all(queryStatement, [], (err, rows) => {
        if (err) {
            console.error('Error executing query:', err.message);
            callback(err, null);
            return;
        }
        if (rows != null && rows.length > 0) {
            // incrementSearchCount(query, (err) => {
            //     if (err) {
            //         callback(err, null);
            //         console.log(`Data selected successfully: ${rows.length} rows found`);
            //     } else {
            //         console.log(' found.');
            //         callback(null, rows);
            //     }
            // });
            callback(null, rows);
        } else {
            callback('NOT_FOUND', null);
        }
    });
}
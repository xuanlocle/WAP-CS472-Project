import { getPopularTerms } from "../models/popularModel.js";
import { searchTerm } from "../models/termsModel.js";

const controller = {
    handleSearchTerms: (req, res, next) => {
        const { query } = req.query;
        console.log(`Searching for term: ${query}`);
        if (query === undefined || query === '') {
            next(new Error('WRONG_PARAMETER'))
            return;
        }
        searchTerm(query, (err, rows) => {
            if (err) {
                console.log();
                if (err === 'NOT_FOUND') {
                    next(new Error('NOT_FOUND'))
                    return;
                }
                return res.status(500).json({ error: 'Failed to search for terms' });
            }
            res.status(200).json(rows);
        });
    },
    // getTermDetails: (req, res, next) => {

    // },
    handleGetPopularTerms: (req, res, next) => {
        getPopularTerms((err, rows) => {
            if (err) {
                console.log();
                if (err === 'NOT_FOUND') {
                    next(new Error('NOT_FOUND'))
                    return;
                }
                return res.status(500).json({ error: 'Failed to search for terms' });
            }
            res.status(200).json(rows);
        });
    }
};
export default controller;
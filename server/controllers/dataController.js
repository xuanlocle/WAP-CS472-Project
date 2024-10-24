import createSearchCountsTable from '../models/popularModel.js';
import { checkAndInsertTerms } from '../models/termsModel.js';


export default function setupDatabase() {
    checkAndInsertTerms();
    createSearchCountsTable();
}


import express from 'express';
import termController from '../controllers/termController.js'

const router = express.Router();

/**
 * @swagger
 * /terms/popular:
 *   get:
 *     summary: Get popular terms
 *     description: Retrieve a list of the most popular terms based on search counts.
 *     responses:
 *       200:
 *         description: A list of popular terms.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   word:
 *                     type: string
 *                     example: "king"
 *                   popular:
 *                     type: integer
 *                     example: 10
 */
router.route('/popular').get(termController.handleGetPopularTerms);

/**
 * @swagger
 * /terms/search:
 *   get:
 *     summary: Search for terms
 *     description: Retrieve matching terms based on the query parameter.
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The search query.
 *     responses:
 *       200:
 *         description: A list of matching terms.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   word:
 *                     type: string
 *                     example: "Address"
 *                   wordtype:
 *                     type: string
 *                     example: "v. t."
 *                   definition:
 *                     type: string
 *                     example: "Skill; skillful management; dexterity; adroitness."
 *       404:
 *         description: No matching terms found.
 */
router.route('/search').get(termController.handleSearchTerms);



export default router;



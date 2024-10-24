import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import termRouter from './routers/termRouter.js';
import setupDatabase from './controllers/dataController.js';
import { setupSwagger } from './controllers/swaggerController.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001
const host = process.env.HOST || 'localhost'

setupDatabase();
app.use(cors());
setupSwagger(app);
app.use('/terms', termRouter);

app.use((err, req, res, next) => {
  if (err.message === 'WRONG_PARAMETER')
    res.status(400).json({ error: 'Wrong parameter' });
  else if (err.message === 'NOT_FOUND')
    res.status(404).json({ error: 'Not found data' });
  else
    res.status(500).json({ error: 'Something went wrong. ' + err.message });
})

app.listen(port, () => {
  console.log(`Example app listening at http://${host}:${port}`);
});

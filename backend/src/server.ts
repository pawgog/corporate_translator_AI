import "dotenv/config";

import express from 'express';
import cors from 'cors';

import translateRoute from './routes/translate';

const app = express();

app.use(cors({ origin:[process.env.FRONTEND_URL || 'http://localhost:5173'] }));
app.use(express.json());

app.use('/api/translate', translateRoute);

app.listen(process.env.PORT || 3001, ()=>console.log('API running'));

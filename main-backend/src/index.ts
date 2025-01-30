import express from 'express';
import cors from 'cors';
import mainRouter from './routes/index';
import { connectDB } from './db';
import client from 'prom-client'
import {metricsMiddleware} from './monitoring/index';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(metricsMiddleware);

app.use('/api/v1', mainRouter);

app.use('/metrics', async (req, res) => { 
  const metrics = await client.register.metrics();
  res.set('Content-Type', client.register.contentType);
  res.end(metrics);
});  

const startDb = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
}

startDb();

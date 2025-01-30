import express from 'express';
import cors from 'cors';
import mainRouter from './routes/index';
import { connectDB } from './db';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/v1', mainRouter);

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

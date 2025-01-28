import { connectDB } from '../../src/db'; 
import mongoose from 'mongoose';

jest.setTimeout(10000); 

describe('Database Connection', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should connect to MongoDB successfully', async () => {
    try {
      const mongooseInstance = await connectDB();

      expect(mongooseInstance.connection.readyState).toBe(1); 

      console.log('Connected to MongoDB:', mongooseInstance.connection.host);
    } catch (error) {
      console.error('Database connection error:', error);
      throw error; 
    }
  });
});

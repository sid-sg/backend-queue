// redisClient.ts
import { createClient } from "redis";

// const redisHost = process.env.REDIS_HOST || 'redis';
// const redisPort = process.env.REDIS_PORT || '6379';

// console.log('Redis Configuration:');
// console.log('Host:', redisHost);
// console.log('Port:', redisPort);
// console.log('Full URL:', `redis://${redisHost}:${redisPort}`);

export const redisClient = createClient();

redisClient.on('error', err => {
    console.log('Redis Client Error:', {
        message: err.message,
        code: err.code,
        details: err
    });
});

redisClient.on('connect', () => {
    console.log('Redis Client Connected');
});

redisClient.on('ready', () => {
    console.log('Redis Client Ready');
});

const initRedis = async () => {
    try {
        console.log('Attempting to connect to Redis...');
        await redisClient.connect();
        console.log('Connected to Redis successfully');
    } catch (error) {
        console.error('Failed to connect to Redis:', error);
        process.exit(1); // Exit if Redis connection fails
    }
};

initRedis();

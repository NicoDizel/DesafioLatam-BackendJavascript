import getEnv from './env.js';

export const PORT = getEnv('PORT', 3000);
export const JWT_SECRET = getEnv('JWT_SECRET');
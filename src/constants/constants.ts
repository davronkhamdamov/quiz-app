import { config } from 'dotenv';
config();

const { JWT_SECRET } = process.env;
export { JWT_SECRET };

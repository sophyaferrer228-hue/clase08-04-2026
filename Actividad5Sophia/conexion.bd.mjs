import { Pool } from 'pg';
import 'dotenv/config'; // Asegura que lea el .env

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false }
});

export default pool;
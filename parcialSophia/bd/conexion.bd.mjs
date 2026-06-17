import { Pool } from 'pg'
import 'dotenv/config' 

// const pool = new Pool({
//     connectionString: process.env.DB_URL,
//     ssl: { rejectUnauthorized: false }
// })

const pool = new Pool({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASS,
    database: process.env.BD_BD,
    port: process.env.BD_PORT,
})

export default pool
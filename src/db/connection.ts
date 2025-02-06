import {drizzle} from "drizzle-orm/node-postgres";
import {Pool} from "pg";

const dburl = 'postgresql://neondb_owner:npg_q7ZYsQBVpAo8@ep-black-breeze-a22ojwv3-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require';

export const pool = new Pool({
    connectionString: dburl,
});

export const db = drizzle(pool);

pool.on("connect", () => {
    console.log("Connected to PostgreSQL database!");
});
  
  pool.on("error", (err) => {
    console.error("Database connection error:", err);
});


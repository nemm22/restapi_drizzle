import {defineConfig} from 'drizzle-kit';

export default defineConfig({
    schema: "./src/models/*.ts",
    out: "migrations/",
    dialect: "postgresql",
    dbCredentials: {
        host: 'ep-black-breeze-a22ojwv3-pooler.eu-central-1.aws.neon.tech',
        user: 'neondb_owner',
        password: 'npg_q7ZYsQBVpAo8',
        database: 'neondb'
    },
});




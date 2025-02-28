import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './router';
import {pool, db} from './db/connection';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080/');
});

try {
    pool.query("SELECT 1");
    console.log("Database is ready!");
} catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
}



app.use('/',router());
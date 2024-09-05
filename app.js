import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();
app.use( express.json() );

connectDB( DATABASE_URL );



app.use( '/api/users', userRoutes );
app.use( '/api/jobs', jobRoutes );

app.listen( PORT, () => console.log( `Server running on port ${PORT}` ) );

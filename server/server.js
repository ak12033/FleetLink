import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js';
import vehicleRouter from './routes/vehicleRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

const app = express()
const PORT = process.env.PORT || 5000;

await connectDB()

// Middlewares
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send("Server is Live!"));
app.use('/api', vehicleRouter);
app.use('/api', bookingRouter);

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
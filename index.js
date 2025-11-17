import dotenv from "dotenv";
dotenv.config();
console.log("LOADED FROM ENV:", process.env.MONGO_URI);
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import entryRoutes from './routes/entries.js';
import forecastRoutes from './routes/forecast.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api/forecast', forecastRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(()=> {
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=> console.log('Server running on port', PORT));
  })
  .catch(err => console.error('MongoDB connection error', err));

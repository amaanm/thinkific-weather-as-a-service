import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { errorHandler } from './middleware/error-handler';

// import controllers and models
import controllers from './controllers';
import models from './models';

// read and set environment variables 
dotenv.config({ path: path.resolve(__dirname, '../../', '.env') });

// setup express app and main configuration vars
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.set('PORT', process.env.API_PORT || 3000);

// setup models
models(app);

// setup controllers
controllers(app);

// express error handler
app.use(errorHandler());

export default app;


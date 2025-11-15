import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import productsRouter from './routes/products.js';
import checkoutRouter from './routes/checkout.js';
import downloadRouter from './routes/download.js';
import connectDb from './config/db.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({ origin: process.env.CLIENT_URL?.split(',') || '*', credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

// Static for product images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/products', productsRouter);
app.use('/api/checkout', checkoutRouter);
app.use('/api/download', downloadRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'stackflow.dev' });
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();




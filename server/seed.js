import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Product from './src/models/Product.js';

dotenv.config();

async function run() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const uploads = (name) => path.join('samples', name);

  await mongoose.connect(process.env.MONGODB_URI);

  await Product.deleteMany({});
  await Product.insertMany([
    {
      title: 'MERN Complete Notes',
      description: 'Comprehensive MERN stack notes with code snippets and diagrams.',
      priceInCents: 79900,
      imageUrl: '/uploads/samples/mern.png',
      filePath: uploads('mern-notes.pdf'),
      slug: 'mern-complete-notes',
      isFree: false
    },
    {
      title: 'React Notes',
      description: 'Modern React patterns, hooks, performance, and testing notes.',
      priceInCents: 39900,
      imageUrl: '/uploads/samples/react.png',
      filePath: uploads('react-notes.pdf'),
      slug: 'react-notes',
      isFree: false
    },
    {
      title: 'Node + Express Notes',
      description: 'Production-ready Node and Express notes with best practices.',
      priceInCents: 49900,
      imageUrl: '/uploads/samples/node.png',
      filePath: uploads('node-express-notes.pdf'),
      slug: 'node-express-notes',
      isFree: false
    },
    {
      title: 'Git Essentials Cheat Sheet',
      description: 'Quick commands and workflows for daily Git usage.',
      priceInCents: 0,
      imageUrl: '/uploads/samples/git.png',
      filePath: uploads('git-cheatsheet.pdf'),
      slug: 'git-essentials-cheatsheet',
      isFree: true
    },
    {
      title: 'DSA Starter Pack',
      description: 'Basics of arrays, strings, and common patterns with examples.',
      priceInCents: 0,
      imageUrl: '/uploads/samples/dsa.png',
      filePath: uploads('dsa-starter-pack.pdf'),
      slug: 'dsa-starter-pack',
      isFree: true
    },
    {
      title: 'DSA Complete Roadmap',
      description: 'Pattern-wise topics covering all essential DSA concepts with detailed explanations and examples.',
      priceInCents: 39900,
      imageUrl: '/uploads/samples/dsa.png',
      filePath: uploads('dsa-complete-roadmap.pdf'),
      slug: 'dsa-complete-roadmap',
      isFree: false
    }
  ]);

  console.log('Seeded products');
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});





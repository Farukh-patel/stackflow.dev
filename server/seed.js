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
      isFree: false,
      category: 'Full Stack',
      features: [
        'MongoDB setup & schema design',
        'Express.js routing & middleware',
        'React hooks & state management',
        'Node.js best practices',
        'Full-stack authentication',
        'API integration patterns'
      ]
    },
    {
      title: 'React Notes',
      description: 'Modern React patterns, hooks, performance, and testing notes.',
      priceInCents: 39900,
      imageUrl: '/uploads/samples/react.png',
      filePath: uploads('react-notes.pdf'),
      slug: 'react-notes',
      isFree: false,
      category: 'JavaScript',
      features: [
        'React Hooks (useState, useEffect, custom)',
        'Component composition patterns',
        'Performance optimization techniques',
        'Context API & state management',
        'React Router & navigation',
        'Testing with Jest & React Testing Library'
      ]
    },
    {
      title: 'Node + Express Notes',
      description: 'Production-ready Node and Express notes with best practices.',
      priceInCents: 49900,
      imageUrl: '/uploads/samples/node.png',
      filePath: uploads('node-express-notes.pdf'),
      slug: 'node-express-notes',
      isFree: false,
      category: 'JavaScript',
      features: [
        'Express.js routing & middleware',
        'RESTful API design',
        'Error handling & validation',
        'Database integration (MongoDB, PostgreSQL)',
        'Authentication & authorization',
        'Deployment & production tips'
      ]
    },
    {
      title: 'Git Essentials Cheat Sheet',
      description: 'Quick commands and workflows for daily Git usage.',
      priceInCents: 0,
      imageUrl: '/uploads/samples/git.png',
      filePath: uploads('git-cheatsheet.pdf'),
      slug: 'git-essentials-cheatsheet',
      isFree: true,
      category: 'DevOps',
      features: [
        'Basic Git commands',
        'Branching & merging strategies',
        'Staging & committing',
        'Remote repository management',
        'Conflict resolution',
        'Git workflows (GitFlow, GitHub Flow)'
      ]
    },
    {
      title: 'DSA Starter Pack',
      description: 'Basics of arrays, strings, and common patterns with examples.',
      priceInCents: 0,
      imageUrl: '/uploads/samples/dsa.png',
      filePath: uploads('dsa-starter-pack.pdf'),
      slug: 'dsa-starter-pack',
      isFree: true,
      category: 'DSA',
      features: [
        'Arrays & string manipulation',
        'Basic sorting algorithms',
        'Two-pointer technique',
        'Sliding window pattern',
        'Hash maps & sets',
        'Time & space complexity basics'
      ]
    },
    {
      title: 'DSA Complete Roadmap',
      description: 'Pattern-wise topics covering all essential DSA concepts with detailed explanations and examples.',
      priceInCents: 39900,
      imageUrl: '/uploads/samples/dsa.png',
      filePath: uploads('dsa-complete-roadmap.pdf'),
      slug: 'dsa-complete-roadmap',
      isFree: false,
      category: 'DSA',
      features: [
        'All major DSA patterns (15+ patterns)',
        'Trees, graphs, and advanced structures',
        'Dynamic programming strategies',
        'Backtracking & recursion',
        'Greedy algorithms',
        '150+ solved examples with explanations'
      ]
    },
    {
      title: 'Python Automation Playbook',
      description: 'Hands-on Python projects covering scripts, APIs, and automation workflows.',
      priceInCents: 34900,
      imageUrl: '/uploads/samples/mern.png',
      filePath: uploads('mern-notes.pdf'),
      slug: 'python-automation-playbook',
      isFree: false,
      category: 'Python',
      features: [
        'Python basics & advanced concepts',
        'Web scraping with BeautifulSoup',
        'API integration & requests',
        'File handling & automation',
        'Data processing with pandas',
        'Script optimization & best practices'
      ]
    },
    {
      title: 'AI & ML Interview Kit',
      description: 'Curated notes on machine learning algorithms, model tuning, and system design for ML interviews.',
      priceInCents: 59900,
      imageUrl: '/uploads/samples/node.png',
      filePath: uploads('dsa-complete-roadmap.pdf'),
      slug: 'ai-ml-interview-kit',
      isFree: false,
      category: 'AI & ML',
      features: [
        'Core ML algorithms (supervised & unsupervised)',
        'Neural networks & deep learning basics',
        'Model evaluation & metrics',
        'Feature engineering techniques',
        'ML system design patterns',
        'Interview questions & answers'
      ]
    },
    {
      title: 'Java Springboard Notes',
      description: 'Java fundamentals, OOP patterns, and Spring Boot quick references for backend interviews.',
      priceInCents: 45900,
      imageUrl: '/uploads/samples/react.png',
      filePath: uploads('react-notes.pdf'),
      slug: 'java-springboard-notes',
      isFree: false,
      category: 'Java',
      features: [
        'Java OOP concepts & design patterns',
        'Collections framework & generics',
        'Spring Boot fundamentals',
        'REST API development',
        'Database integration (JPA, Hibernate)',
        'Exception handling & best practices'
      ]
    },
    {
      title: 'Advanced JavaScript Patterns',
      description: 'Reusable JS patterns, performance tips, and interview-ready explanations.',
      priceInCents: 29900,
      imageUrl: '/uploads/samples/node.png',
      filePath: uploads('node-express-notes.pdf'),
      slug: 'advanced-javascript-patterns',
      isFree: false,
      category: 'JavaScript',
      features: [
        'Closures, scope & hoisting',
        'Promises, async/await patterns',
        'Event loop & concurrency',
        'Design patterns (Module, Observer, etc.)',
        'Performance optimization',
        'ES6+ features & modern syntax'
      ]
    }
  ]);

  console.log('Seeded products');
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});





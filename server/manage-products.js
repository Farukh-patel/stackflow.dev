import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Product from './src/models/Product.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploads = (name) => path.join('samples', name);

async function connect() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
}

async function addProduct(productData) {
  await connect();
  
  const product = await Product.findOneAndUpdate(
    { slug: productData.slug },
    productData,
    { upsert: true, new: true }
  );
  
  console.log(`✅ Product "${product.title}" ${product.isNew ? 'created' : 'updated'}`);
  await mongoose.disconnect();
}

async function updateProduct(slug, updates) {
  await connect();
  
  const product = await Product.findOneAndUpdate(
    { slug },
    updates,
    { new: true }
  );
  
  if (!product) {
    console.error(`❌ Product with slug "${slug}" not found`);
    await mongoose.disconnect();
    return;
  }
  
  console.log(`✅ Product "${product.title}" updated`);
  await mongoose.disconnect();
}

async function listProducts() {
  await connect();
  
  const products = await Product.find({}).sort({ createdAt: -1 });
  console.log('\n📦 Current Products:');
  products.forEach((p, i) => {
    console.log(`${i + 1}. ${p.title} (${p.slug}) - ₹${(p.priceInCents / 100).toFixed(0)} ${p.isFree ? '[FREE]' : ''}`);
  });
  
  await mongoose.disconnect();
}

async function main() {
  const command = process.argv[2];
  
  if (command === 'list') {
    await listProducts();
    return;
  }
  
  if (command === 'add') {
    // ADD NEW PRODUCT - Modify this object
    await addProduct({
      title: 'New Product Name',
      description: 'Product description here',
      priceInCents: 49900, // ₹499.00
      imageUrl: '/uploads/samples/product-image.png',
      filePath: uploads('product-file.pdf'),
      slug: 'new-product-slug', // Must be unique, lowercase, hyphens
      isFree: false,
      category: 'Category Name'
    });
    return;
  }
  
  if (command === 'update') {
    const slug = process.argv[3];
    if (!slug) {
      console.error('❌ Please provide a slug: npm run manage update <slug>');
      return;
    }
    
    // UPDATE EXISTING PRODUCT - Modify this object
    await updateProduct(slug, {
      title: 'Updated Product Name',
      description: 'Updated description',
      priceInCents: 59900, // Update price
      // filePath: uploads('updated-file.pdf'), // Update PDF
      // imageUrl: '/uploads/samples/new-image.png', // Update image
    });
    return;
  }
  
  console.log(`
Usage:
  npm run manage list          - List all products
  npm run manage add           - Add new product (edit script first)
  npm run manage update <slug> - Update product (edit script first)
  
Examples:
  npm run manage list
  npm run manage add
  npm run manage update react-notes
  `);
}

main().catch(console.error);


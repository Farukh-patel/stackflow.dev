import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priceInCents: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, required: true },
    filePath: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    isFree: { type: Boolean, default: false },
    category: {
      type: String,
      trim: true,
      default: 'General'
    },
    notionUrl: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);





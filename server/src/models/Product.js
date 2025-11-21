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
    features: {
      type: [String],
      default: []
    },
    notionUrl: { type: String }
  },
  { timestamps: true }
);

productSchema.index({ createdAt: -1 });
productSchema.index({ category: 1, createdAt: -1 });

export default mongoose.model('Product', productSchema);





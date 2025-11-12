import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        priceInCents: { type: Number, required: true }
      }
    ],
    stripeSessionId: { type: String, index: true },
    downloadToken: { type: String, index: true },
    tokenExpiresAt: { type: Date },
    paid: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);






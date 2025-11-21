import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    buyerName: { type: String, trim: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        priceInCents: { type: Number, required: true }
      }
    ],
    razorpayOrderId: { type: String, index: true },
    razorpayPaymentId: { type: String },
    razorpayPaymentLinkId: { type: String },
    downloadToken: { type: String, index: true },
    tokenExpiresAt: { type: Date },
    paid: { type: Boolean, default: false },
    paymentStatus: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED', 'CANCELLED'], default: 'PENDING' },
    antiPiracyCode: { type: String, index: true },
    downloadHistory: [
      {
        productSlug: String,
        downloadedAt: { type: Date, default: Date.now },
        ipAddress: String,
        userAgent: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);






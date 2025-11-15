import mongoose from 'mongoose';

export default async function connectDb() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error('MONGODB_URI not set');
  
  try {
    // Connection options optimized for MongoDB Atlas
    const options = {
      serverSelectionTimeoutMS: 30000, // Increased to 30s for Atlas connections
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      connectTimeoutMS: 30000, // Increased to 30s for initial connection
      heartbeatFrequencyMS: 10000, // How often to check server status
      retryWrites: true,
      w: 'majority',
      // Connection pooling
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 0, // Start with 0, create as needed
      maxIdleTimeMS: 30000, // Close connections after 30s of inactivity
      // Allow reading from secondaries during replica set issues
      readPreference: 'primaryPreferred',
      // For Atlas replica sets
      directConnection: false, // Use replica set mode
    };

    await mongoose.connect(mongoUri, options);
    console.log('MongoDB connected successfully');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    
    // More detailed error logging for debugging
    if (error.reason) {
      console.error('Connection error reason:', error.reason);
    }
    
    // Check if it's a network/Atlas issue
    if (error.message.includes('Server selection timed out') || error.message.includes('ReplicaSetNoPrimary')) {
      console.error('\n⚠️  MongoDB Atlas Connection Issue Detected');
      console.error('Possible causes:');
      console.error('1. IP address not whitelisted in MongoDB Atlas Network Access');
      console.error('2. Replica set is down or primary is unavailable');
      console.error('3. Connection string might be incorrect');
      console.error('4. Network/firewall blocking connection');
      console.error('\nSolutions:');
      console.error('1. Go to MongoDB Atlas → Network Access → Add IP Address');
      console.error('2. Add 0.0.0.0/0 for testing (remove after fixing)');
      console.error('3. Verify connection string includes correct database name');
      console.error('4. Check Atlas cluster status in dashboard');
    }
    
    throw error;
  }
}






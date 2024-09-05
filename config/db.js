import mongoose from 'mongoose';

const connectDB = async ( DATABASE_URL ) => {
  try {
    const DB_OPTIONS = {
      dbName: "authDB"
    }
    await mongoose.connect( DATABASE_URL, DB_OPTIONS )
    console.log( 'Database Connected Successfully...' )
  } catch ( error ) {
    console.log( `Error:${error.message}` )
    process.exit( 1 );
  }
}

export default connectDB
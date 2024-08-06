import mongoose, { ConnectOptions } from "mongoose";
mongoose.set(`strictQuery`, true)

const connectDB = async () => {
  try {
    const con = await mongoose.connect((process.env.MONGO_URI as string), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    console.log(`Mongodb connected ${con.connection.host}`);
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.log('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected from MongoDB');
    });
  } catch (error: any) {
    console.log(error.message)
  }
}

export default connectDB
import 'dotenv/config';
import mongoose from 'mongoose';

const connectionString = 'mongodb://root:example@localhost:27017'
  + '/?authSource=admin&readPreference=primary&ssl=false';

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI || connectionString,
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;

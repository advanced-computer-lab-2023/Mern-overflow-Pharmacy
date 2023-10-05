import express from 'express';
import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';

dotenv.config();

// const app = express();
// const PORT = 8000;
const mongoUrl:string = process.env.MONGO_URI!;

// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello, World! This is your Express server.');
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// testDatabaseConnection();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongoUrl);

  const schema = new mongoose.Schema({
	name: String,
	age: Number,
  });

  const User = mongoose.model('User', schema);

  // Create a new user document
  const newUser = new User({ name: 'John', age: 30 });

  // Save the user document to the database
  await newUser.save();

  console.log('Document inserted:', newUser);

  // Query the database for a user document
  const queryResult = await User.findOne({ name: 'John' });

  console.log('Document found:', queryResult);

}


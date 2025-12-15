const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 1) Load environment variables FIRST
dotenv.config({ path: './config.env' });

// 2) Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception 🥺. Shutting Application...');
  console.log(err.name, err.message);
  process.exit(1);
});

// 3) Now load the app AFTER env variables are available
const app = require('./app');

// 4) Connect DB
const DB = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'));

// 5) Start server
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// 6) Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection 🥺. Shutting Application...');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});

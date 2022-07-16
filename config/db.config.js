const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/glovo');
mongoose.connection.on('connected', () => console.info('Mongoose default connection open'));
mongoose.connection.on('error', err => console.info(`Mongoose default connection error: ${err}`));
mongoose.connection.on('disconnected', () => console.info('Mongoose default connection disconnected'));
 
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
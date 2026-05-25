const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/atrangi';
console.log('Testing connection to local:', uri);

mongoose.connect(uri)
    .then(() => {
        console.log('Connected successfully to localhost');
        process.exit(0);
    })
    .catch(err => {
        console.error('Connection error for localhost:', err.message);
        process.exit(1);
    });

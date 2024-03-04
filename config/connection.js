global.mongoose = require('mongoose');

global.databaseURL = 'mongodb://127.0.0.1:27017/socialNetwork-API';
global.goodConetions='Connected to MongoDB';
global.poorConetions='Error connecting to MongoDB: ';

global.connectToDatabase = async () => {
    try {
        await mongoose.connect(databaseURL);
        console.log(goodConetions);
    } catch (error) {
        console.error(poorConetions, error);
        process.exit(1); 
    }
};

connectToDatabase();

module.exports = mongoose.connection;

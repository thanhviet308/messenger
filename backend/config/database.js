const mongoose = require('mongoose');

const databaseConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Mongodb Database Connected');
    } catch (error) {
        console.error('Database Connection Error:', error);
    }
};

module.exports = databaseConnect;

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/socialMediaAssignments`, {
            useNewUrlParser: true
          });
        console.log(`MongoDB Connected...`);
    } catch (err) {
        console.error(err);
    }

}

module.exports = connectDB;



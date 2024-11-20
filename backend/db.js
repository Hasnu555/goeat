const mongoose = require("mongoose")

const mongoUrl = "mongodb+srv://hasnu:hj091200@hasan.mg8eu13.mongodb.net/goeat?retryWrites=true&w=majority&appName=Hasan"

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
        
        // const collections = await mongoose.connection.db.collections()
        // console.log('Collections:', collections.map(col => col.collectionName)); // Display collection names

        // const fetchedData = await mongoose.connection.db.collection("foodCategory")
        // const data = await fetchedData.find({}).toArray();
        // console.log("Fetched Data:", data);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

module.exports = mongoDB;

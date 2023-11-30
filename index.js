const express = require('express');


const mongoose = require('mongoose');
const HelpContext = require("./context/HelpContext")

const cors = require('cors');

require("dotenv").config()
const dbLink = process.env.MONGO_DB_CONNECTION

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Connect to MongoDB
mongoose.connect(dbLink, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Example route
app.get('/ping', (req, res) => {
  res.json("ping")
});

app.post("/submit", async(req, res)=>{
    const {firstName, lastName, email, topic, description} = req.body
    console.log(firstName, lastName, email, topic, description)

    try {
        const newData = new HelpContext({
            firstName,
            lastName,
            email,
            topic,
            description
        });

        await newData.save();

        res.status(201).send("Ticket submitted successfully");
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).send("Error submitting ticket");
    }

    res.send("ok")
})

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

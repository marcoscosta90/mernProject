const mongoose = require('mongoose');

const bootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name to the bootcamp"],
        unique: true
    },
    rating: {
        type: Number,
        required: [true, "Please provide a rating for a bootcamp"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description for a bootcamp"]
    },
    price: {
        type: Number,
        required: [true, "Please provide a price for a bootcamp"]
    }
})

const Bootcamp = mongoose.model('Bootcamp', bootcampSchema);

module.exports = Bootcamp;
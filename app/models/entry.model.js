const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
    name: String,
    city: String,
    registration_date: Date, 
}, {
    timestamps: true
});

module.exports = mongoose.model('entry', entrySchema);
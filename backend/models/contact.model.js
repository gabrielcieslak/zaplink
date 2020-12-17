const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const contactSchema = new Schema({
    name: String,
    number: String,
    description: String
})

module.exports= mongoose.model('Contact',contactSchema);
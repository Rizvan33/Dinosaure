const mongoose = require('mongoose');

var dinosaureSchema = new mongoose.Schema({
    Age: {
        type: String,
        required: 'This field is required.'
    },
    Famille: {
        type: String
        required: 'This field is required.'
    },
    Race: {
        type: String
        required: 'This field is required.'
    },
    Nourriture: {
        type: String
        required: 'This field is required.'
    }
});

mongoose.model('dinosaure', dinosaureSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const currency = mongoose.Types.currency;

var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5
        },
    comment:  {
        type: String
    },
    author:  {
        type: String
    }
}, {
    timestamps: true
});

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true    
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    feature : {
        type: Boolean,
        default: false
    }
    ,comments : [commentSchema]  
},{
    timestamps: true
});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;
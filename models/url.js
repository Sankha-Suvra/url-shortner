const mongoose = require("mongoose");
const shortid = require("shortid");

const urlSchema = new mongoose.Schema(
{
    full:{
        type: String,
        required: true,
    },
    short:{
        type: String,
        required: true,
        unique: true,
        default: shortid.generate,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
},
{timestamp:true}
);

 
module.exports= mongoose.model('ShortUrl', urlSchema);;
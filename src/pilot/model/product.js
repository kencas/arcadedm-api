var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var ProductSchema = new Schema(
    {
        merchant: {type : Schema.Types.ObjectId, ref: 'Merchant'},
        category: {type : Schema.Types.ObjectId, ref: 'Category'},
        name : {type: String, required: true},
        description : {type: String, required: true},
        details : {type: String, required: true},
        image : {type: String, required: true},
        created : {type: Date, default: Date.now}
    }
);



module.exports = mongoose.model('Product',ProductSchema);
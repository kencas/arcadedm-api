var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var PricesSchema = new Schema(
    {
        category : {type: String, required: true},
        section : {type: String, required: true},
        rate: {type: Number, required: true, default: 0}
    }
);



module.exports = mongoose.model('Prices',PricesSchema);
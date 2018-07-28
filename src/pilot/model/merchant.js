var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var MerchantSchema = new Schema(
    {
        name : {type: String, required: true},
        address : {type: String, required: true},
        location : {type: String, required: true},
        state : {type: String, required: true},
        email : {type: String, required: true},
        phoneno : {type: String, required: true},
        image : {type: String, required: true},
        created : {type: Date, default: Date.now}
    }
);



module.exports = mongoose.model('Merchant',MerchantSchema);
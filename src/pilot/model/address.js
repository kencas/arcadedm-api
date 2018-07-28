var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var AddressSchema = new Schema(
    {
        driver: {type : Schema.Types.ObjectId, ref: 'Driver'},
        address: {type: String, required: true, default: 'N'},
        city: {type: String, required: true, default: 'N'},
        created : {type: Date, default: Date.now}
    }
);



module.exports = mongoose.model('Address',AddressSchema);
var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var CustomerSchema = new Schema(
    {
        rides: [{type : Schema.Types.ObjectId, ref: 'Ride'}],
        firstname : {type: String, required: true},
        lastname : {type: String, required: true},
        email : {type: String, required: true},
        countryCode : {type: String, required: true},
        phoneno : {type: String, required: true},
        code: {type: String, required: true},
        created : {type: Date, default: Date.now}
    }
);



module.exports = mongoose.model('Customer',CustomerSchema);
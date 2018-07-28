var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var AllocationSchema = new Schema(
    {
        customer: {type : Schema.Types.ObjectId, ref: 'Customer'},
        estate: {type : Schema.Types.ObjectId, ref: 'Estate'},
        isVerified: {type: String, required: true, default: 'N'},
        created : {type: Date, default: Date.now}
    }
);



module.exports = mongoose.model('Allocation',AllocationSchema);
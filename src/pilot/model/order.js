var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var OrderSchema = new Schema(
    {
        customer: {type : Schema.Types.ObjectId, ref: 'Customer'},
        store: {type : Schema.Types.ObjectId, ref: 'Store'},
        user: {type : Schema.Types.ObjectId, ref: 'User'},
        amount : {type: Number, required: true},
        status : {type: String, required: true},
        isDelivered : {type: String, default:"N", required: true},
        created : {type: Date, default: Date.now}
    }
);



module.exports = mongoose.model('Subscription',SubscriptionSchema);
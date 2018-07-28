var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var ChannelSchema = new Schema(
    {
        payment: [{type : Schema.Types.ObjectId,ref : 'Payment'}],
        name : {type: String, required: true},
        GLAccNo : {type: String, required: true},
        created : {type: Date, default: Date.now}
    }
);



module.exports = mongoose.model('Channel',ChannelSchema);
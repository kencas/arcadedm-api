var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var EstateSchema = new Schema(
    {
        name : {type: String, required: true},
        allocations: [{type : Schema.Types.ObjectId, ref: 'Allocation'}],
        created : {type: Date, default: Date.now}
    }
);



module.exports = mongoose.model('Estate',EstateSchema);
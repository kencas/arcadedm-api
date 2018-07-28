var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var TransactionSchema = new Schema(
    {
        amount: {type: Number, required: true},
        created : {type: Date, default: Date.now},
        postings: [{type : Schema.Types.ObjectId, ref: 'Posting'}],
        reference: {type: String, required: true},
        referenceID: {type: String, required: true}
    }
);



module.exports = mongoose.model('Transaction',TransactionSchema);
var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var PostingSchema = new Schema(
    {
        accountNo: {type: String, required: true},
        reference: {type: String, required: true},
        referenceID: {type: String, required: true},
        identifier: {type: String, required: true},//OP/GL/LM
        section: {type: String, required: true},//Asset/Liability/Expenses/Income/Equity
        amount: {type: Number, required: true},
        created : {type: Date, default: Date.now},
        transaction: {type : Schema.Types.ObjectId, ref: 'Transaction'}
    }
);



module.exports = mongoose.model('Posting',PostingSchema);
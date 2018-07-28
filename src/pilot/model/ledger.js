var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var LedgerSchema = new Schema(
    {
        acctype: {type : String, required: true},
        name : {type: String, required: true},
        AccNo : {type: String, required: true},
        balance: {type: Number, required: true, default: 0},
        prefix: {type: String, required: true},
        created : {type: Date, default: Date.now}
    }
);



module.exports = mongoose.model('Ledger',LedgerSchema);
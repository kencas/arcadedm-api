var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var AccountSchema = new Schema(
    {
        accountNo : {type: String, required: true},
        balance: {type: Number, required: true, default: 0},
        section : {type: String, required: true},
        GLAccNo : {type: String, required: true},
        index: {type: Number, required: true, default: 0},
        created : {type: Date, default: Date.now}
    }
);



module.exports = mongoose.model('Account',AccountSchema);
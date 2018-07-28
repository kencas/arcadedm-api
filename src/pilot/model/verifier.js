var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var VerifierSchema = new Schema(
    {
        code : {type: String, required: true},
        countryCode : {type: String, required: true},
        phoneno : {type: String, required: true},
        status : {type: String, default:'Unused', required: true},
        isVerified: {type: String, default: 'N'},
        created : {type: Date, default: Date.now}
    }
);



module.exports = mongoose.model('Verifier',VerifierSchema);
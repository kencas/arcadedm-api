var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        email : {
            type: String, 
            required: true,
            unique: true, 
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
        password: {type : String, required: true},
        created : {type: Date, default: Date.now}
    }
);



module.exports = mongoose.model('User',UserSchema);
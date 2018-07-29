var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var CategorySchema = new Schema(
    {
        products: [{type : Schema.Types.ObjectId, ref: 'Product'}],
        name : {type: String, required: true},
        image : {type: String, required: true},
        created : {type: Date, default: Date.now}
    }
);



module.exports = mongoose.model('Category',CategorySchema);
var mongoose = require('mongoose');

 var cetegorySchema= {
 	_id: {type: String},
 	parent: {
 		type: String,
 		ref: 'Category'
 	},
 	ancestors : [{
 		type: String,
 		ref: 'Category'
 	}]
 };

 module.exports = new mongoose.Schema(cetegorySchema);
 module.exports.cetegorySchema = cetegorySchema;

 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const revoraFormSchema = new Schema({
    firstName : { type: String },
    lastName : { type: String },
    organizationName : { type: String},
    Email : { type: String},
    LandLine : { type: String},
    Mobile : { type: String},
    country : { type: String},
    city : { type: String},
    help : { type: String},
    message : { type: String},
    subject : { type: String},
    deleted : { type: Boolean, default: false },
},{ timestamps: true });

module.exports = mongoose.model("RevoraForm", revoraFormSchema);
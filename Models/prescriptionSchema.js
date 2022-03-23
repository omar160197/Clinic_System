const mongoose =require("mongoose");
const autoincremint = require('mongoose-sequence')(mongoose);
// building schema 
const prescriptionSchema= new mongoose.Schema({

    _id:{type:Number},
    medicine:{type:Number,ref:"medicine"},
    patient:{type:Number,ref:"patient"},
    doctor:{type:Number,ref:"doctor"},
    appointment:{type:Number,ref:"appointment"},
});

prescriptionSchema.plugin(autoincremint,{
    id:"prescription count",
    inc_field:"_id"
})
// register schema for mongoo
const Prescription=mongoose.model("Prescription",prescriptionSchema);
module.exports=Prescription;

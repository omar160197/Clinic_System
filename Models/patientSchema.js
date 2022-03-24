const {mongoose}=require('mongoose');

const patientSchema=new mongoose.Schema({

patientName:{type:String,required:true,unique:true},
phoneNumber:{type:Number,required:true},
patientEmail:{type:String,required:true},

patientAddress:{
    country:{type:String,required:true},
    city:{type:String,required:true},
},

gender:{type:String,enum:["Male","Female"],required:true},
});


const Patients=mongoose.model("Patients",patientSchema);

module.exports=Patients;    



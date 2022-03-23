const {body,query,param}=require("express-validator");
const bcrypt = require("bcrypt");
const Prescription = require("../Models/prescriptionSchema");
exports.getAllPrescription = (request,response,next) => {
    Prescription.find({}).populate({path:'medicine'}).populate({path:'patient'}).populate({path:'doctor'}).populate({path:'appointment'})
        .then((data)=>{
            response.status(200).json(data)
        }).catch(err=>{next(err+"cant show Prescription")})    
      
}
exports.getPrescriptionById = (request,response,next) => {
    Prescription.findOne({_id:request.body._id})
    .then((data)=>{
        response.status(200).json(data)
    }).catch(err=>{next(err)})    
  
}
exports.createPrescription=(request,response,next)=>{
  
     let { medicine,patient,doctor,appointment} = request.body;
     let newPrescription = new Prescription({
        medicine,
        patient,
        doctor,
        appointment
      })
    newPrescription.save()
          .then(data=>{
            response.status(201).json({message:"added",data})
          })
          .catch(error=>next(error +"this is wrong"))    
}
exports.updatePrescription=(request,response,next)=>{
    let { medicine,patient,doctor,appointment} = request.body;
    Prescription.updateOne({ _id:request.body._id },{
         medicine,
         patient,
         doctor,
         appointment
}
).then(data=>{
if(data.modifiedCount==0)throw new Error("Prescription not found")
    response.status(200).json({message:"updated",data})
})
.catch(error=>next(error))
  
};
exports.deletePrescription=(request,response,next)=>{
    Prescription.findOneAndDelete({ _id:request.body._id })  
  .then(data=>{
      if(data.modifiedCount==0)throw new Error("Prescription not found")
          response.status(200).json({message:"deleted",data})
      })
      .catch(error=>next(error))

}


   
const router = require("express").Router();
const {
    getAllOrOne,
    addPatient,
    editPatient,
    deletePatient
}=require('../Controllers/patientController')


const {
    validatePostData,
    validatePutData,
    validateDeleteData
}=require('../Services/patientVlidator')

router
.route('/patient/:id?')
.get(getAllOrOne)
.post(validatePostData(),addPatient)
.put(validatePutData(),editPatient)
.delete(validateDeleteData(),deletePatient)


module.exports=router
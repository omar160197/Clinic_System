const express = require("express");
const { body, query, param } = require("express-validator");
const {
    getAllPrescription,
    getPrescriptionById,
    createPrescription,
    updatePrescription,
    deletePrescription,
} = require("../Controllers/prescriptionController");
const {
    validatePostPrescription,
    validatePutPrescription,
    validateDeletePrescription ,
} = require("../Services/prescriptionService");
const status = express.Router();
status
  .route("/Prescription")
  .get(getAllPrescription)
  .get(getPrescriptionById)
  .post(validatePostPrescription(), createPrescription)
  .put(validatePutPrescription(), updatePrescription)
  .delete(validateDeletePrescription (),deletePrescription);

module.exports = status;

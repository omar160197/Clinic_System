const { body } = require("express-validator");
module.exports.validatePostPrescription = () => {
  return [
    body("medicine").isInt().withMessage("medicine is ref"),
    body("patient").isInt().withMessage("patient is ref"),
    body("doctor").isInt().withMessage("doctor is ref"),
    body("appointment").isInt().withMessage("appointment is ref")
  ];
};

module.exports.validatePutPrescription = () => {
    return [
        body("_id").isInt().withMessage("id is required and must be number"),
        body("newPrescription.medicine").isInt().withMessage("medicine is ref"),
        body("newPrescription.patient").isInt().withMessage("patient is ref"),
        body("newPrescription.doctor").isInt().withMessage("doctor is ref"),
        body("newPrescription.appointment").isInt().withMessage("appointment is ref")
      ];
    };

module.exports.validateDeletePrescription = () => {
  return body("_id").isInt().withMessage("id is not a number");
};
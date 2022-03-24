const { body, param } = require("express-validator");

const Patients = require("../Models/patientSchema");

/*------------------------------------- post --------------------------------------*/

module.exports.validatePostData = () => {
  return [
    body("patientName")
      .isString()
      .withMessage("//patientName is required and must be alpha"),

    body("patientEmail")
      .isEmail()
      .custom((value) => {
        return Patients.findOne({ patientEmail: value }).then((user) => {
          if (user) {
            return Promise.reject("E-mail already in use");
          }
        });
      })
      .withMessage("//E-mail already in use"),

    body("phoneNumber").isInt().withMessage("//phoneNumber is Number"),

    body("patientAddress")
      .isObject()
      .withMessage("//patientAddress is object contain city && country"),

    body("patientAddress.city").isString().withMessage("city is string"),

    body("patientAddress.country").isString().withMessage("country is string"),
    body("gender")
      .isString()
      .isIn(["Male", "Female"])
      .withMessage("//select your gender Male or Female"),
  ];
};

/*------------------------------------- put --------------------------------------*/
module.exports.validatePutData = () => {
  return [
    param("id")
      .custom((value) => {
        return Patients.findOne({ _id: value }).then((user) => {
          if (!user) return Promise.reject("cannot find this patient");
        });
      })
      .withMessage("cannot find this patient"),

    body("patientName")
      .isString()
      .withMessage("//patientName is required and must be alpha"),

    body("patientEmail")
      .isEmail()
      .custom((value) => {
        return Patients.findOne({ patientEmail: value }).then((user) => {
          if (user) {
            return Promise.reject("E-mail already in use");
          }
        });
      })
      .withMessage("//E-mail already in use"),

    body("phoneNumber").isInt().withMessage("//phoneNumber is Number"),

    body("patientAddress")
      .isObject()
      .withMessage("//patientAddress is object contain city && country"),

    body("patientAddress.city").isString().withMessage("city is string"),

    body("patientAddress.country").isString().withMessage("country is string"),
    body("gender")
      .isString()
      .isIn(["Male", "Female"])
      .withMessage("//select your gender Male or Female"),
  ];
};

/*------------------------------------- delete --------------------------------------*/

module.exports.validateDeleteData = () => {
  return body("_id").isObject().withMessage("id is only number");
};

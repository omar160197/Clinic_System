const Patients = require("../Models/patientSchema");
const { validationResult } = require("express-validator");

module.exports = {
  getAllOrOne: async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
      try {
        const allPatient = await Patients.find({});
        res.status(200).json(allPatient);
      } catch (error) {
        next(`cannot get all patients:${error}`);
      }
    } else {
      try {
        const patient = await Patients.findOne({ _id: id });
        if (patient) {
          res.status(200).json(patient);
        } else res.status(400).json({ patient: "not Found" });
      } catch (error) {
        next(`cannot get this patient:${error}`);
      }
    }
  }, //getAllOrOne patient

  addPatient: (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error = new Error();
      error.status = 422;
      error.message = errors
        .array()
        .reduce((current, object) => current + object.msg + " ", "");
      throw error;
    }

    const patient = new Patients({
      patientName: req.body.patientName,
      phoneNumber: req.body.phoneNumber,
      patientEmail: req.body.patientEmail,
      patientAddress: req.body.patientAddress,
      gender: req.body.gender,
    });
    patient
      .save()
      .then((data) => {
        if (data == null) throw new Error("cannot post this patient");
        res.status(200).json({ message: "added", data });
      })
      .catch((error) => next(error));
  }, //add New patient

  editPatient: (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error = new Error();
      error.status = 422;
      error.message = errors
        .array()
        .reduce((current, object) => current + object.msg + " ", "");
      throw error;
    }

    Patients.updateOne(
      { _id: req.params.id },
      {
        $set: {
          patientName: req.body.patientName,
          phoneNumber: req.body.phoneNumber,
          patientEmail: req.body.patientEmail,
          patientAddress: req.body.patientAddress,
          gender: req.body.gender,
        },
      }
    )
      .then((data) => {
        if (data == null) throw new Error("cannot update this patient");
        res.status(200).json({ message: "updated", data });
      })
      .catch((error) => next(error));
  }, //update patient



  deletePatient: async (req, res, next) => {
    const { id } = req.params;
    const patient = Patients.findOne({ _id: id });
    if (!patient) {
      next("cannot find this patient");
    } else {
      try {
        const data = await Patients.deleteOne({ _id: id });

        res.send({ msg: "deleted", data });
      } catch (err) {
        next(err.message);
      }
    }
  }, //delete Patient
};

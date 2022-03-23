/*------------------------------- Importing-------------------------------*/
//Importing
const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

/*------------------------------- Routers-------------------------------*/
const PrescriptionRouter=require("./routers/prescriptionRouter")
/*------------------------------- Images-------------------------------*/
//image variable
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, 'images'));
  },
  filename: (req, file, callback) => {
    callback(
      null,
      new Date().toLocaleDateString().replace(/\//g, '-') +
        '-' +
        file.originalname
    );
  },
});
const fileFilter = (req, file, callback) => {
  if (
    file.mimetype == 'image/jpeg' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/png'
  )
    callback(null, true);
  else callback(null, false);
};

/*-------------------------------- create server --------------------------*/

const app = express();
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header(
    'Access-Control-Allow-Methods',
    'GET,POST,DELETE,PUT,OPTIONS'
  );
  response.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

/*------------------------------- connect to DB-------------------------------*/

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log('connected to clinicSystemDB');
    //listening on port
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`listening to http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));

/*------------------------------- MiddelWares-------------------------------*/

app.use((req, res, next) => {
  morgan(':method :url :status');
  next();
});

app.use("/Images",express.static(path.join(__dirname,"Images")))
app.use(multer({storage,fileFilter}).single("image"));
app.use(cors());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false})); 

/*------------------------------- RoutersMiddleWares-------------------------------*/
app.use(PrescriptionRouter);

//Not found MW
app.use((request, response) => {
  response.status(404).json({ data: 'Not Fond' });
});

//Error MW
app.use((error, request, response, next) => {
  //JS  code function.length
  let status = error.status || 500;
  response.status(status).json({ Error: error + '' });
});

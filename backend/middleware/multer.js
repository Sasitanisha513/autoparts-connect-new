const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/vehicles");

  },

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() +
      path.extname(file.originalname);

    cb(null, uniqueName);

  },

});

// File filter
const fileFilter = (req, file, cb) => {

  const allowedTypes = /jpg|jpeg|png|webp/;

  const extension =
    allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

  const mimeType =
    allowedTypes.test(file.mimetype);

  if (extension && mimeType) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      )
    );

  }

};

module.exports = multer({

  storage,

  fileFilter,

});
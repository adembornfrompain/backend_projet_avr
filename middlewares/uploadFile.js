const multer = require("multer");
const path = require("path");
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "public/images"; // Default path
    if (req.originalUrl.includes('sendInvoice')) {
      uploadPath = "public/uploads/invoices";
    } else if (req.originalUrl.includes('financialDocument')) {
      uploadPath = "public/uploads/financialDocuments";
    } else if (req.originalUrl.includes('operationalDocument')) {
      uploadPath = "public/uploads/operationalDocuments";
    }

    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    let uploadPath = "public/images"; // Default path
    if (req.originalUrl.includes('sendInvoice')) {
      uploadPath = "public/uploads/invoices";
    } else if (req.originalUrl.includes('financialDocument')) {
      uploadPath = "public/uploads/financialDocuments";
    } else if (req.originalUrl.includes('operationalDocument')) {
      uploadPath = "public/uploads/operationalDocuments";
    }
    const originalName = file.originalname;
    console.log(file.originalname);
    const fileExtension = path.extname(originalName);
    let fileName = originalName;

    // verify if the file already exists

    let fileIndex = 1;
    while (fs.existsSync(path.join(uploadPath, fileName))) {
      const baseName = path.basename(originalName, fileExtension);
      fileName = `${baseName}_${fileIndex}${fileExtension}`;
      fileIndex++;
    }

    cb(null, fileName);
  },
});

// Add file filter to allow specific file types
var fileFilter = function (req, file, cb) {
  let allowedTypes = [];
  if (req.originalUrl.includes('sendInvoice')) {
    allowedTypes = ["application/pdf"];
  } else if (req.originalUrl.includes('financialDocument')) {
    allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  } else if (req.originalUrl.includes('operationalDocument')) {
    allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  } else {
    allowedTypes = ["image/jpeg", "image/png", "text/plain"]; // Default types
  }
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

var uploadfile = multer({ storage: storage, fileFilter: fileFilter });
module.exports = uploadfile;

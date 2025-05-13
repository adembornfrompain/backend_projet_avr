var express = require('express');
var router = express.Router();
const os = require("os");
const osController = require("../controllers/osController");

/* GET users listing. */




router.get('/getDataFromPc',osController.getOsInformation);
router.get("/cpus", osController.osCpus);
router.get("/cpus/:id", osController.osCpusById);


module.exports = router;


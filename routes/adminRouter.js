const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticate, isAdmin } = require("../middlewares/auth.js");


router.get("/getMyProfile", authenticate, isAdmin, adminController.getProfile); // get profile
router.put("/updateMyProfile", authenticate, isAdmin, adminController.updateProfile); // update profile
router.delete("/deleteUser/:id", authenticate, isAdmin, adminController.deleteUser); // delete user

router.get("/getAllUsers", authenticate, isAdmin, adminController.getAllUsers); // get all users
router.get("/user/:id", authenticate, isAdmin, adminController.getUserById); // get user by ID
router.put("/user/:id/reset-password", authenticate, isAdmin, adminController.resetUserPassword); // reset user password

router.put("/updatePassword", authenticate, isAdmin, adminController.updatePassword); // update password
router.delete("/deleteAccount", authenticate, isAdmin, adminController.deleteAccount); // delete account
router.get("/getAllShipments", authenticate, isAdmin, adminController.getAllShipments); // get all shipments
router.get("/getShipmentById/:id", authenticate, isAdmin, adminController.getShipmentById); // get shipment by ID
router.get("/getPendingShipments", authenticate, isAdmin, adminController.getPendingShipments); // get pending shipments
router.get("/getAllQuotes", authenticate, isAdmin, adminController.getAllQuotes); // get all quotes
router.get("/getQuoteById/:id", authenticate, isAdmin, adminController.getQuoteById); // get quote by id
router.get("/viewSalesReports", authenticate, isAdmin, adminController.viewSalesReports); // view sales reports

router.put("/user/:id/assign-role", authenticate, isAdmin, adminController.assignRole); // assign role to user
module.exports = router;

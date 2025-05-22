const express = require("express");
const router = express.Router();
const shipmentController = require("../controllers/shipmentController");
const operationalOfficerController = require("../controllers/operationalOfficerController");  
const uploadFile = require("../middlewares/uploadFile");
const shipmentModel = require("../models/shipmentSchema");
const {
  authenticate,
  isAdmin,
  isClient,
  isFinancialOfficer,
  isOperationalOfficer,
} = require("../middlewares/auth");

// Apply authentication middleware to all routes
router.use(authenticate);

// Client Routes
router.get("/my-shipments", isClient, shipmentController.getClientShipments);
router.get("/:id", isClient, shipmentController.getShipmentById);
router.get("/:id/track", isClient, shipmentController.trackShipment);

// Operational Officer Routes
router.post("/create", isOperationalOfficer, shipmentController.createShipment);

router.put(
  "/:id/status",
  isOperationalOfficer,
  shipmentController.updateShipmentStatus
);

router.get(
  "/pending",
  isOperationalOfficer,
  shipmentController.getPendingShipments
);

router.get(
  "/in-transit",
  isOperationalOfficer,
  shipmentController.getInTransitShipments
);

// Shared Routes (All authenticated users)
router.get(
  "/delivered",
  [isClient, isFinancialOfficer, isOperationalOfficer, isAdmin],
  shipmentController.getDeliveredShipments
);

// Admin and Financial Officer Routes
router.get(
  "/",
  [isAdmin, isFinancialOfficer, isOperationalOfficer],
  shipmentController.getAllShipments
);

// Tracking routes for clients
router.get(
  "/track/:trackingNumber",
  [isClient, isOperationalOfficer, isAdmin],
  shipmentController.trackShipment
);

// Tracking update route for operational officers
router.post(
  "/track/:trackingNumber/update",
  isOperationalOfficer,
  shipmentController.updateTrackingStatus
);

// Delete shipment (Operational Officer)
router.delete("/:id", isOperationalOfficer, shipmentController.deleteShipment);

module.exports = router;

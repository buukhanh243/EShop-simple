const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");


router.route("/").post(ordersController.createOrder).get(ordersController.getAllOrders);
router.route("/get/totalsales").get(ordersController.getTotalSales);
router.route("/get/count").get(ordersController.getCountOrders);
router.route("/get/userorders/:userid").get(ordersController.getUserOder);
router
  .route("/:id")
  .get(ordersController.getDetailOrder)
  .patch(ordersController.editOrder)
  .delete(ordersController.deleteOrder);

module.exports = router;

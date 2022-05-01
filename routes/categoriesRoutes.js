const express = require("express");
const categoriesController = require("../controllers/categoriesController");

const router = express.Router();

// router.param('id', tourController.checkID);
router
  .route("/")
  .get(categoriesController.getAllCategories)
  .post(categoriesController.createCategory);

router
  .route("/:id")
  .get(categoriesController.getCategoryById)
  .delete(categoriesController.deleteCategory)
  .patch(categoriesController.updateCategory);

module.exports = router;

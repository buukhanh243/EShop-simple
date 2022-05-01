const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsController");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

router
  .route("/")
  .post(uploadOptions.single("image"), productController.createProduct)
  .get(productController.getAllProduct);

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

router.route("/get/count").get(productController.getCountProducts);

router.route("/get/featured/:count").get(productController.getFeaturedProducts);

router
  .route("/gallery-images/:id")
  .patch(uploadOptions.array('images', 10), productController.uploadMultiImage);

module.exports = router;

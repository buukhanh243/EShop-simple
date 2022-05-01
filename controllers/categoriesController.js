const Category = require("../models/categoryModel");

exports.getAllCategories = async (req, res) => {
  const categoryList = await Category.find({});

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
};

exports.getCategoryById = async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res
      .status(500)
      .json({
        success: false,
        message: "Category with the given ID was not found",
      });
  }
  res.status(200).send(category);
};

exports.createCategory = async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();

  if (!category) return res.status(400).send("the category cannot be created!");

  res.send(category);
};
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "the category cannot be deleted" });
    }

    return res.status(200).json({
      success: true,
      message: "the category was successfully deleted",
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error });
  }
};

exports.updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true } //this code will return new obj ngay lap tuc thay vi old obj
  );
  if (!category) return res.status(400).send("the category cannot be updated");

  res.send(category);
};

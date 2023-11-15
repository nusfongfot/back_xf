const { Op, Sequelize } = require("sequelize");
const ProductModel = require("../models/Product");
const uploadServices = require("../services/uploadServices");

exports.getAllProduct = async (req, res, next) => {
  try {
    const data = await ProductModel.findAll({
      order: [["pro_id", "DESC"]],
    });
    return res
      .status(200)
      .json({ res_code: "0000", message: "Create product successfully", data });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { pro_name, pro_code, pro_price, pro_description } = req.body;
    const imagesFiles = req.files;
    const urls = [];

    if (!pro_name) {
      return res.status(400).json({ message: "pro_name is required" });
    }
    if (!pro_code) {
      return res.status(400).json({ message: "pro_code is required" });
    }
    if (!pro_price) {
      return res.status(400).json({ message: "pro_price is required" });
    }
    if (!pro_description) {
      return res.status(400).json({ message: "pro_description is required" });
    }

    if (!imagesFiles) {
      return res.status(400).json({ message: "files is required" });
    }
    const arrayFilesSingleImage = imagesFiles.images;
    const lengthFiles = Object.keys(arrayFilesSingleImage).length;

    //upload for multiple images
    const uploader = async (path) =>
      await uploadServices.uploads(path, "Products");
    let pathUpload = [];
    if (lengthFiles == 9) {
      // if have only single image
      pathUpload = arrayFilesSingleImage.tempFilePath;
      const newPath = await uploader(pathUpload);
      urls.push(newPath);
    } else {
      pathUpload = imagesFiles.images.map((item) => item.tempFilePath);
      for (const path of pathUpload) {
        const newPath = await uploader(path);
        urls.push(newPath);
      }
    }
    const imageToDb = urls.map((item) => item.url).join(",");
    const data = await ProductModel.create({
      pro_name,
      pro_code,
      pro_price,
      pro_description,
      pro_images: imageToDb,
    });
    return res
      .status(200)
      .json({ res_code: "0000", message: "Create product successfully", data });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

exports.searchProduct = async (req, res, next) => {
  try {
    const { q } = req.query;
    const data = await ProductModel.findAll({
      order: [["pro_id", "DESC"]],
      where: {
        [Op.or]: [
          Sequelize.literal("LOWER(pro_name) LIKE :query"),
          {
            pro_name: {
              [Op.substring]: q.toLowerCase(),
            },
          },
          {
            pro_code: {
              [Op.substring]: q,
            },
          },
        ],
      },
      replacements: { query: `%${q.toLowerCase()}%` },
    });
    
    return res.status(200).json({ res_code: "0000", data });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await ProductModel.findAll({
      order: [["pro_id", "DESC"]],
      where: {
        pro_id: id,
      },
    });
    return res.status(200).json({ res_code: "0000", data });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

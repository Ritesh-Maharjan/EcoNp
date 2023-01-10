const asyncHandler = require("express-async-handler");
const Product = require("../model/Product");
const User = require("../model/User");
const ErrorHandler = require("../utils/ErrorHandler");
const Features = require("../utils/Features");

// Get all products
const getAllProducts = asyncHandler(async (req, res, next) => {
  const resultPerPage = 10;
  const productCount = await Product.count();
  const feature = new Features(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await feature.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

// Get products by id
const getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return next(
      new ErrorHandler("Product is not found with the given id", 404)
    );
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// create Product
const createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Update product
const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let product = await Product.findById(id);

  if (!product) {
    return next(
      new ErrorHandler("Product is not found with the given id", 404)
    );
  }

  product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete product
const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let product = await Product.findById(id);

  if (!product) {
    return next(
      new ErrorHandler("Product is not found with the given id", 404)
    );
  }

  product = await Product.findByIdAndDelete(id, req.body);

  res.status(200).json({
    success: true,
    message: "Successfully deleted the product",
  });
});

// Create or Update review
const productReview = asyncHandler(async (req, res, next) => {
  const { productId, rating, comments } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comments,
  };

  // Find the product
  const product = await Product.findById(productId);
  // check if the product is already reviewed by the user or not
  const isReviewed = product.reviews.find((el) => {
    return el.user.toString() === req.user._id.toString();
  });

  if (isReviewed) {
    // if already reviewd update the old review
    product.reviews.forEach((el) => {
      if (el.user.toString() === req.user._id.toString()) {
        el.rating = review.rating;
        el.comments = review.comments;
      }
    });
  } else {
    // push the new review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  // Updating the overall ratings and number of reviews
  let avg = 0;

  product.reviews.forEach((el) => {
    avg += el.rating;
  });

  product.ratings = avg / product.numOfReviews;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// get all reviews of a product
const getAllProductReview = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorHandler("Product not found with the provided id", 404)
    );
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete the review created by the user
const deleteReview = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return next(
      new ErrorHandler("Product not found with the provided id", 404)
    );

  // getting the logged in user id
  const userId = req.user._id;

  // removing the logged in user reviews
  const reviews = product.reviews.filter(
    (el) => el.user.toString() !== userId.toString()
  );

  // Updating the overall ratings and number of reviews
  let avg = 0;
  let numOfReviews = 0;

  reviews.forEach((el) => {
    avg += el.rating;
    numOfReviews++;
  });

  product.reviews = reviews;
  product.numOfReviews = numOfReviews;
  // if there is no reviews left then rating should be 0;
  if (numOfReviews) {
    product.ratings = 0;
  } else {
    product.ratings = avg / numOfReviews;
  }

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  productReview,
  getAllProductReview,
  deleteReview,
};

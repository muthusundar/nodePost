const multer = require('multer');
const sharp = require('sharp');
const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an images! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadPostImages = upload.fields([
  { name: 'images', maxCount: 1 }
]);


exports.resizePostImages = catchAsync(async (req, res, next) => {
  if (!req.files.images || !req.files.images) return next();

  // Cover images

  req.body.images = `assets/img/posts/post-${req.params.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.images[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/${req.body.images}`);
  next();
});


exports.getAllPosts = factory.getAll(Post);
exports.getPost = factory.getOne(Post);
exports.createPost = factory.createOne(Post);
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);

const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router
  .route('/')
  .get(postController.getAllPosts)
  .post(
    (req,res,next)=>{
      console.log("body  ",req.body);
      next()},
    postController.uploadPostImages,
    postController.resizePostImages,
    postController.createPost
  );

router
  .route('/:id')
  .get(postController.getPost)
  .patch(
    postController.uploadPostImages,
    postController.resizePostImages,
    postController.updatePost
  )
  .delete(
    postController.deletePost
  );

module.exports = router;

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const fs =require('fs');
exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    try{
    deleteImage(req.params.id,Model);   
    
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch(error){
    res.status(400).json(error);
  }
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    try{
    deleteImage(req.params.id,Model);  
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {   
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data:  doc      
    });
  } catch(error){
    res.status(400).json(error);
  }
  });

exports.createOne = (Model) =>  
    catchAsync(async (req, res, next) => {
      try{
      const doc = await Model.create(req.body);
      res.status(201).json({
        status: 'success',
        data: doc      
      });
    }
   catch(error){
    res.status(400).json(error);
  }
} );

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.params.id);
    let query = Model.findById(req.params.id);
    //query = await query;
    const doc =  await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc
      
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on post (hack)
    let filter = {};
    if (req.params.postId) filter = { post: req.params.postId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc
    });
  });

deleteImage = async (id,Model) => {
    let query = Model.findById(id);
      const r =  await query;
      fs.unlink(__dirname+`../../public/${r.images}`, (err) => {
        if (err) 
          console.log(`${r.images} was not deleted`);
      });
  }
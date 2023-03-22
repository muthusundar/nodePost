const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A post must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A post title must have less or equal then 40 characters'],
      minlength: [5, 'A post title must have more or equal then 10 characters']
      // validate: [validator.isAlpha, 'title name must only contain characters']
    },
    slug: String,
    content: {
      type: String,
      trim: true,
      maxlength: [400, 'A post title must have less or equal then 40 characters'],
      minlength: [10, 'A post title must have more or equal then 10 characters'],
      required: [true, 'A post must have a content']
    },
    images: {
      type: String,
      required: [true, 'A post must have a cover image']
    },
    publish: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select:true
    }
  }
);

//INDEX
postSchema.index({ slug: 1 });

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
postSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// QUERY MIDDLEWARE
// postSchema.pre(/^find/, function(next) {
//   this.find({ publish: { $eq: true } });
//   this.start = Date.now();
//   next();
// });

// AGGREGATION MIDDLEWARE
postSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { publish: { $ne: true } } });
  console.log(this.pipeline());
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

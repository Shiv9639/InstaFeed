var Post = require("../model/post.js");
var Comment = require("../model/comment.js");
var File = require("../model/file.js");
var Chunk = require("../model/chunks.js");
var auditChunk = require("../aggregation/auditChunks.json");
var auditFile = require("../aggregation/auditFile.json");
var unwind = require("../aggregation/unwind.json");
const { isNullOrUndefined } = require("util");
var defaults = require("../../src/assets/defaults.json");
var fileService = require("../services/fileService.js");
const Mongoose = require("mongoose");

postService = {};

postService.submitPost = (data) => {
  return Post.create(data);
};

postService.getPostById = async (postId, updateViewCount) => {
  if (updateViewCount == "true")
    await Post.findOneAndUpdate({ _id: postId }, { $inc: { views: 1 } });

  var post = await Post.aggregate([
    { $match: { _id: Mongoose.Types.ObjectId(postId) } },
    auditFile,
    unwind,
    auditChunk,
  ]);

  await Post.populate(post[0], { path: "comments" });

  return post[0];
};

var express = require("express");
var router = express.Router();
var postService = require("../services/postService.js");

// ********************* //
// base api call: '/api' //
// ********************* //

router.get("/getPost/:id/:updateViewCount", function (req, res) {
  return postService
    .getPostById(req.params.id, req.params.updateViewCount)
    .then((data) => {
      res.json(data);
    });
});

router.post("/submitPost", function (req, res) {
  return postService.submitPost(req.body).then((data) => {
    res.json(data);
  });
});

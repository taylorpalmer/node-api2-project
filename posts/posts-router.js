const express = require("express");
const posts = require("../data/db");

const router = express.Router();

router.get("/api/posts", (req, res) => {
  posts
    .find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The posts information could not be retrieved.",
      });
    });
});

router.get("/api/posts/:id", (req, res) => {
  posts
    .findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved.",
      });
    });
});

router.get("/api/posts/:id/comments", (req, res) => {
  posts
    .findCommentById(req.params.id)
    .then((comments) => {
      if (!comments) {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      } else {
        res.status(200).json(comments);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The comments information could not be retrieved.",
      });
    });
});

router.post("/api/posts", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }

  posts
    .add(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

router.post("/api/posts/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(404).json({
      message: "The post with the specified ID does not exist.",
    });
  } else if(!req.body.text) {
      res.status(400).json({
        errorMessage: "Please provide text for the comment."
      })
  }
  posts
    .insertComment()
    .then((comment) => {
        res.status(201).json(comment)
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
          error: "There was an error while saving the comment to the database",
        });
});

router.delete("/api/posts/:id", (req, res) => {
    if (!req.params.id) {
        return res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      } else {
        res.status(500).json({
            error: "The post could not be removed"
        });
      }
});

module.exports = router;

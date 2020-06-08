const express = require("express");
const posts = require("../data/db");

const router = express.Router();

router.get("/api/posts", (req, res) => {});

router.get("/api/posts/:id", (req, res) => {});

router.get("/api/posts/:id/comments", (req, res) => {});

router.post("/api/posts", (req, res) => {});

router.post("/api/posts/:id", (req, res) => {});

router.delete("/api/posts/:id", (req, res) => {});

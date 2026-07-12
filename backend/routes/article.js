const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

// ==========================
// Add Article
// ==========================
router.post("/add", async (req, res) => {
  try {
    const article = new Article(req.body);

    await article.save();

    res.status(201).json({
      message: "Article added successfully",
      article
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// ==========================
// View All Articles
// ==========================
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();

    res.status(200).json(articles);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// ==========================
// View Single Article
// ==========================
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found"
      });
    }

    res.status(200).json(article);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;
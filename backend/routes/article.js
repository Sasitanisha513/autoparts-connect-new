const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const Article = require("../models/Article");

// =====================================================
// MULTER IMAGE UPLOAD CONFIGURATION
// =====================================================

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1E9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  }

});

// Allow image files only
const fileFilter = (req, file, cb) => {

  if (file.mimetype.startsWith("image/")) {

    cb(null, true);

  } else {

    cb(
      new Error("Only image files are allowed"),
      false
    );

  }

};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});


// =====================================================
// ADD ARTICLE
// =====================================================

router.post(
  "/add",
  upload.single("image"),
  async (req, res) => {

    try {

      const article = new Article({

        title: req.body.title,

        content: req.body.content,

        author:
          req.body.author ||
          "AutoParts Connect",

        category: req.body.category,

        image: req.file
          ? `/uploads/${req.file.filename}`
          : ""

      });

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

  }
);


// =====================================================
// VIEW ALL ARTICLES
// =====================================================

router.get("/", async (req, res) => {

  try {

    const articles =
      await Article.find()
        .sort({ createdAt: -1 });

    res.status(200).json(articles);

  } catch (error) {

    res.status(500).json({

      error: error.message

    });

  }

});


// =====================================================
// VIEW SINGLE ARTICLE
// =====================================================

router.get("/:id", async (req, res) => {

  try {

    const article =
      await Article.findById(req.params.id);

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


// =====================================================
// UPDATE ARTICLE
// =====================================================

router.put(
  "/:id",
  upload.single("image"),
  async (req, res) => {

    try {

      const updateData = {

        title: req.body.title,

        content: req.body.content,

        category: req.body.category

      };

      // If a new image was selected
      if (req.file) {

        updateData.image =
          `/uploads/${req.file.filename}`;

      }

      const updatedArticle =
        await Article.findByIdAndUpdate(

          req.params.id,

          updateData,

          {
            new: true,
            runValidators: true
          }

        );

      if (!updatedArticle) {

        return res.status(404).json({

          message: "Article not found"

        });

      }

      res.status(200).json({

        message:
          "Article updated successfully",

        article: updatedArticle

      });

    } catch (error) {

      res.status(500).json({

        error: error.message

      });

    }

  }
);


// =====================================================
// DELETE ARTICLE
// =====================================================

router.delete("/:id", async (req, res) => {

  try {

    const deletedArticle =
      await Article.findByIdAndDelete(
        req.params.id
      );

    if (!deletedArticle) {

      return res.status(404).json({

        message: "Article not found"

      });

    }

    res.status(200).json({

      message:
        "Article deleted successfully"

    });

  } catch (error) {

    res.status(500).json({

      error: error.message

    });

  }

});


module.exports = router;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const controller = require("../controllers/filesController");

const uploadsPath = path.join(__dirname, "..", "..", "uploads");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsPath);
  },
  filename: function (req, file, cb) {
    // originalname may arrive encoded as latin1; normalize to UTF-8
    const orig = Buffer.from(file.originalname, 'latin1').toString('utf8');
    // keep Cyrillic and common filename chars, replace others with '_'
    const safe = orig.replace(/[^0-9a-zA-Z\u0400-\u04FF.\-_ ]/g, '_');
    cb(null, Date.now() + '-' + safe);
  },
});
const upload = multer({ storage });

router.get("/", controller.listFiles);
router.post("/", upload.single("file"), controller.uploadFile);
router.put("/:id", controller.renameFile);
router.delete("/:id", controller.deleteFile);

module.exports = router;

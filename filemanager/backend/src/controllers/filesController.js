const File = require("../models/file");
const fs = require("fs");
const path = require("path");

exports.listFiles = async (req, res) => {
  try {
    const files = await File.find({}, "filename").lean();
    res.json(files.map((f) => ({ id: f._id, filename: f.filename })));
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    // originalname may be encoded as latin1 by the multipart parser; convert to UTF-8
    const originalName = Buffer.from(req.file.originalname, 'latin1').toString('utf8');
    const fileDoc = await File.create({ filename: originalName, path: req.file.path });
    res
      .status(201)
      .json({
        id: fileDoc._id,
        filename: fileDoc.filename,
        path: fileDoc.path,
      });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.renameFile = async (req, res) => {
  try {
    const { id } = req.params;
    const { filename } = req.body;
    if (!filename) return res.status(400).json({ error: "Filename required" });
    const updated = await File.findByIdAndUpdate(
      id,
      { filename },
      { new: true },
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json({ id: updated._id, filename: updated.filename });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findById(id);
    if (!file) return res.status(404).json({ error: "Not found" });
    const fullPath = path.resolve(file.path);
    fs.unlink(fullPath, async (err) => {
      // ignore unlink error
      await File.findByIdAndDelete(id);
      res.json({ success: true });
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

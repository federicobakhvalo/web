// create page router
const express = require("express");
const pageRouter = express.Router();

const { getAbout, getHome } = require("../controllers/page-controller.js");

pageRouter.get("/about", getAbout);
pageRouter.get("/", getHome);

module.exports = pageRouter;

const express = require("express");
const urlController = require("../../controllers/api/urlController");
const ROUTES = require("../routes");
const authMiddleware = require("../../middlewares/api/authMiddleware");

const router = express.Router();

router.post(ROUTES.API.URLS.SHORTEN,authMiddleware, urlController.shortenUrl);


module.exports = router;

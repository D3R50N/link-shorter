const express = require("express");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const urlRoutes = require("./urlRoutes");
const ROUTES = require("../routes");

const router = express.Router();

router.use(ROUTES.API.USERS.INDEX, userRoutes);
router.use(ROUTES.API.AUTH.INDEX, authRoutes);
router.use(ROUTES.API.URLS.INDEX, urlRoutes);

router.use((req, res) => {
  res.status(404).json({ error: "Endpoint Not Found" });
});

module.exports = router;

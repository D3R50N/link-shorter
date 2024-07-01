const express = require("express");
const router = express.Router();
const homeController = require("../../controllers/web/homeController");
const ROUTES = require("../routes");
const webAuthMiddleware = require("../../middlewares/web/authMiddleware");
const loginController = require("../../controllers/web/loginController");
const logoutController = require("../../controllers/web/logoutController");
const registerController = require("../../controllers/web/registerController");
const urlController = require("../../controllers/api/urlController");
const preventLogin = require("../../middlewares/web/preventLogin");

router.get(ROUTES.WEB.INDEX, webAuthMiddleware, homeController.index);
router.get(ROUTES.WEB.LOGIN, preventLogin, loginController.index);
router.get(ROUTES.WEB.LOGOUT, logoutController.index);
router.get(ROUTES.WEB.REGISTER, preventLogin, registerController.index);
router.get(ROUTES.API.URLS.GET, urlController.redirectUrl);


router.post(ROUTES.WEB.LOGIN, loginController.post);
router.post(ROUTES.WEB.REGISTER, registerController.post);

module.exports = router;

const ROUTES = require("../../routes/routes");
const { e400 } = require("../../middlewares/errorHandler");
const { clearCookie, setCookie } = require("../../utils/cookies");

exports.index = async (req, res) => {
  try {
    const expNumber = req.query._exp || 0;
    clearCookie(res, "_tk");
    setCookie(res, "_exp", expNumber);
    return res.redirect(ROUTES.WEB.LOGIN);
  } catch (err) {
    console.log(err.message);
    e400(req, res);
  }
};

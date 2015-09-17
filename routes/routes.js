var express = require("express");
var jsonmask = require("json-mask");
var viewDataController = require("../controllers/viewDataController");
var translationsDataController = require("../controllers/translationsDataController");
var userDataController = require("../controllers/userDataController");
var menuDataController = require("../controllers/menuDataController");


//configure routes
var router = express.Router();

/**************************/
/* REST API hello */
router.route('/api')
  .get(function (req, res) {
  res.send({routes: jsonmask(router.stack,"route/(path,stack/method)") });
  console.log("REST API is running.");
});
/* REST API hello */
/**************************/

/**************************/
/* REST API /api/view_data/:assetId/:viewType/:viewName */
router.route('/api/view_data/:assetId/:viewType/:viewName')
  .get(function (req, res) {
    viewDataController.getViewData(req, res);
});
/* REST API /api/view_data/:assetId/:viewType/:viewName */
/**************************/

/**************************/
/* REST API /api/translation/:assetId/:viewType/:viewName/:localeCode */
router.route('/api/translation/:assetId/:viewType/:viewName/:localeCode')
  .get(function (req, res) {
    translationsDataController.getTranslationsData(req, res);
});
/* REST API /api/translation/:assetId/:viewType/:viewName/:localeCode */
/**************************/

/**************************/
/* REST API /api/user/:username */
router.route('/api/user/:userName')
  .get(function (req, res) {
    userDataController.getUserData(req, res);
});
/* REST API /api/user/:username */
/**************************/

/**************************/
/* REST API /api/menu/:assetId/:menuType */
router.route('/api/menu/:assetId/:menuType')
  .get(function (req, res) {
    menuDataController.getMenuData(req, res);
});
/* REST API /api/menu/:assetId/:menuType */
/**************************/

module.exports=router;
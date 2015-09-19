var Q = require("q");
var mongodbManager = require('../utils/mongodbManager');

/*************************************/
/* REST API controller getMenuData */
exports.getMenuData = function (req, res) {
  console.log("Begin: getMenuData");
  console.log("Before getting menu data: " + (new Date()).toISOString());

  var assetId = req.params.assetId;

  // var db = mongodbManager.getConnection(["category"]);

  getMenuDataPromise(assetId)
    .then(function(menuData) {
      console.log("After getting menuData: " + (new Date()).toISOString());
      console.log("menuData:");
      console.log(menuData);

      res.set('Content-Type', 'application/json');
      res.send(menuData);
    })
    .catch(function(error) {
      console.error(error);
      res.send();
    })
    .done(function() {
      console.log("getMenuData mongodb close");
      // db.close();
      console.log("End: getMenuData");
    });
};

var getMenuDataPromise = function(assetId) {
  var dummy_data;

  var d = Q.defer();

  try {
    dummy_data = require('../dummy_data/menu/' + assetId + '_menu.js');
  } catch (ex) {
    dummy_data = {};
  }
  
  d.resolve(dummy_data);

  return d.promise;
};
/* REST API controller getMenuData */
/*************************************/


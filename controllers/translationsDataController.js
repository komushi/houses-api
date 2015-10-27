var Q = require("q");
var mongodbManager = require('../utils/mongodbManager');



/*************************************/
/* REST API controller getTranslationsData */
exports.getTranslationsData = function (req, res) {
  console.log("Begin: getTranslationsData");
  console.log("Before getting translations data: " + (new Date()).toISOString());

  var assetId = req.params.assetId;
  var viewType = req.params.viewType;
  var viewName = req.params.viewName;
  var localCode = req.params.localeCode;

  // var db = mongodbManager.getConnection(["category"]);

  getTranslationsDataPromise(assetId, viewType, viewName, localCode)
    .then(function(translationsData) {
      console.log("After getting translationsData: " + (new Date()).toISOString());
      console.log("translationsData:");
      console.log(translationsData);

      res.set('Content-Type', 'application/json');
      res.send(translationsData);
    })
    .catch(function(error) {
      console.error(error);
      res.send();
    })
    .done(function() {
      console.log("getTranslationsData mongodb close");
      // db.close();
      console.log("End: getTranslationsData");
    });
};

var getTranslationsDataPromise = function(assetId, viewType, viewName, localeCode) {
  var dummy_data;
  var result;

  var d = Q.defer();

  try {

    dummy_data = require('../dummy_data/' + assetId + '/translation/' + assetId + '_' + viewType + '_' + viewName + '.js');
    result = dummy_data[localeCode];

  } catch (ex) {
    result = {};
  }
  
  d.resolve(result);

  return d.promise;
};
/* REST API controller getTranslationsData */
/*************************************/


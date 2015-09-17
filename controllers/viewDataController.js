var Q = require("q");
var mongodbManager = require('../utils/mongodbManager');



/*************************************/
/* REST API controller getViewData */
exports.getViewData = function (req, res) {
  console.log("Begin: getViewData");
  console.log("Before getting view data: " + (new Date()).toISOString());

  var assetId = req.params.assetId;
  var viewType = req.params.viewType;
  var viewName = req.params.viewName;

  // var db = mongodbManager.getConnection(["category"]);

  getViewDataPromise(assetId, viewType, viewName)
    .then(function(viewData) {
      console.log("After getting viewData: " + (new Date()).toISOString());
      console.log("viewData:");
      console.log(viewData);

      res.set('Content-Type', 'application/json');
      res.send(viewData);
    })
    .catch(function(error) {
      console.error(error);
      res.send();
    })
    .done(function() {
      console.log("getViewData mongodb close");
      // db.close();
      console.log("End: getViewData");
    });
};

var getViewDataPromise = function(assetId, viewType, viewName) {
  var dummy_data;

  var d = Q.defer();

  try {
    dummy_data = require('../dummy_data/view_data/' + assetId + '_' + viewType + '_' + viewName + '.js');
  } catch (ex) {
    dummy_data = {};
  }
  
  d.resolve(dummy_data);

  // db.category.findOne(function(err, catList) {
  //   if(err || !catList) 
  //   {
  //     d.reject(new Error(err));
  //   }
  //   else 
  //   {
  //     console.log("catList found");
  //     d.resolve(catList);

  //   }
  // });

  return d.promise;
};
/* REST API controller getViewData */
/*************************************/


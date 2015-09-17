var Q = require("q");
var mongodbManager = require('../utils/mongodbManager');

/*************************************/
/* REST API controller getUserData */
exports.getUserData = function (req, res) {
  console.log("Begin: getUserData");
  console.log("Before getting user data: " + (new Date()).toISOString());

  var userName = req.params.userName;

  // var db = mongodbManager.getConnection(["category"]);

  getUserDataPromise(userName)
    .then(function(userData) {
      console.log("After getting userData: " + (new Date()).toISOString());

      res.set('Content-Type', 'application/json');
      res.send(userData);
    })
    .catch(function(error) {
      console.error(error);
      res.send();
    })
    .done(function() {
      console.log("getUserData mongodb close");
      // db.close();
      console.log("End: getUserData");
    });
};

var getUserDataPromise = function(userName) {
  var dummy_data;

  var d = Q.defer();

  try {
    dummy_data = require('../dummy_data/user/' + userName + '.js');
  } catch (ex) {
    dummy_data = {};
  }
  
  d.resolve(dummy_data);

  return d.promise;
};
/* REST API controller getUserData */
/*************************************/


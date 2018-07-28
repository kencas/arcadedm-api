const Status = require('../model/status');

module.exports = function(){ 
    
    function getDistance(lat,lon,callback) {

        var results = Status.find();

        return callback(null, results);
      }



      return {
        getDistance:  getDistance
      };
    
  };
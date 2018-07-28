const Status = require("../model/status");
const Ride = require("../model/ride");
const Customer = require("../model/customer");
const Verifier =  require('../model/verifier');
const Driver = require("../model/driver");
const Fare = require("../model/fare");
const Pricing = require("../model/prices");
var transaction = require('../classes/transaction');

module.exports = class DriverService {
  constructor() {}

  static create(cust) {

    var response = {
        flag: false,
        message: 'Error signing up',
        data: {}
    };

    const updateOps = {};

  return new Promise(async(resolve, reject) => {
    
    var dr = await Driver.findOne({email: cust.email});

    if(dr != null)
    {
      response.message = "Email already exist";
      reject(response);
      return;
    }
    
    const driver = new Driver({
        firstname: cust.firstname,
        lastname: cust.lastname,
        countryCode: cust.countryCode,
        email: cust.email,
        phoneno: Number(cust.phoneno),
        code: cust.code,
        deviceId: cust.deviceId,
        gender: cust.gender,
        password: String(await transaction.getRandomNumber(100000,999999))
    });

    
    

    

    
  driver
.save()
.then(async(result) => {
    console.log(result);
    response.flag = true;
    response.message = 'Driver registered successfully';
    response.data = result;

    resolve(response);
})
.catch(err => {
    console.log(err)
    reject(err);
});
  });
}

  static async createRideRequest(cust) {

    var response = {
        flag: false,
        message: 'Error',
        ride: null
    };

    const updateOps = {};

  return new Promise(async(resolve, reject) => {

    
    var cst2 = await Ride.findOne({customer: cust.customer, status: 'Pending'});

        // if(cst2 != null)
        // {
        //     response.message = 'There is a Pending Ride request. Please cancel the request';
        //     return reject(response);
        // }

  var driver = await this.getDriverNearby(cust.latStartRider,cust.lonStartRider);

  if(driver == null)
  {
      response.message = 'No driver neardy';
      return reject(response);
  }

  var customer = await Customer.findOne({_id: cust.customer});

  var address = {
    address1: '350 Borno way, Yaba',
    address2: 'Chevron Drive, Lekki'
  };

  const ride = new Ride({
    driver: driver._id,
    customer: cust.customer,
    latStartRider: cust.latStartRider,
    lonStartRider: cust.lonStartRider,
    latEndRider: cust.latEndRider,
    lonEndRider: cust.lonEndRider,
    address1: cust.address1,
    address2: cust.address2
});


    ride
.save()
.then(async(result) => {
    console.log(result);
    response.flag = true;
    response.message = 'Ride request successful';
    response.ride = result;

    var notification = {
      address: address, 
      latStartRider:cust.latStartRider,  
      lonStartRider:cust.lonStartRider,  
      latEndRider: cust.latEndRider,
      lonEndRider: cust.lonEndRider,     
      customer: customer,
      driver: driver._id,
      distance: driver.distance,
      _id: result._id
    };

    transaction.notifyDriver(notification);

    resolve(response);
})
.catch(err => {
    console.log(err)
    reject(error);
});
  });
}

static async calculateRide(cust) {

  var response = {
      flag: false,
      message: 'Error',
      ride: null
  };

  const updateOps = {};

return new Promise(async(resolve, reject) => {

  
  var cst2 = await Ride.findOne({_id: cust.id});

  if(cst2 == null)
  {
    reject({
      error: null,
      message: "Ride details does not exist",
      flag: false
    });

    return;
  }

  var prices = await Pricing.find();

    var fare = {
      "fixed": 0,
      "distance": 0,
      "time": 0,
      "total": 0
    };

    console.log(prices);

    var f = 0;
    
    
    this.getDistance(cust.lat1,cust.lon1,cust.lat2,cust.lon2)
    .then(result => {
        

        prices.map(async function(e) {
            if(e.category == "Premium")
            {
                if(e.section == 'Fixed')
                    fare.fixed += e.rate;
                else if(e.section == 'Time')
                    fare.time += e.rate * (cust.duration / 60);
                else if(e.section == 'Distance')
                    fare.distance += e.rate * (result.distanceValue / 1000);
            }
            else if(e.category == "Basic")
            {
                if(e.section == 'Fixed')
                    fare.fixed += e.rate;
                else if(e.section == 'Time')
                    fare.time += e.rate * (cust.duration / 60);
                else if(e.section == 'Distance')
                    fare.distance += e.rate * (result.distanceValue / 1000);
            }

            
            if(e.section == 'Fixed')
              f = fare.fixed;
            else if(e.section == 'Time')
              f = fare.time;
            else if(e.section == 'Distance')
              f = fare.distance;

              var sec = e.section;

            fare.total += (fare.fixed + fare.distance + fare.time);
            
            const farer = new Fare({
              ride: cst2._id,
              section: sec,
              amount: f,
              category: e.category
          });

          await farer.save();
        });

        cst2.fare = fare.total;
        cst2.distance = result.distanceValue;

        updateOps['status'] = 'Completed';
        updateOps['latEndDriver'] = cust.lat2;
        updateOps['lonEndDriver'] = cust.lon2;
        updateOps['fare'] = fare.total;

  Ride
  .update({_id: cust.id},{$set: updateOps})
        .then(async(result) => {
          console.log(result);
          resolve({
            data: {...cst2,
              fare: fare},
            message: "Fare calculated correctly",
            flag: true
          });
        })
        .catch(err => {
          console.log(err)
          reject(error);
        });

        
    })
    .catch(err => {
            
         console.log(err),
        reject({
            error: err,
            message: "An error occurred",
            flag: false
        });
    });

});
}


static cancelRideRequest(cust) {

  var response = {
      flag: false,
      message: 'Error'
  };

  const updateOps = {};

return new Promise(async(resolve, reject) => {
  
  
  var cst2 = await Ride.findOne({_id: cust.id, status: 'Pending'});

      if(cst2 == null)
      {
          response.message = 'Ride request not found';
          return reject(response);
      }

      updateOps['status'] = 'Cancelled';
      updateOps['isCancelled'] = 'Y';
      updateOps['cancelledBy'] = cust.customer;
      updateOps['cancelCategory'] = 'Customer';

  Ride
  .update({_id: cust.id},{$set: updateOps})
.then(async(result) => {
  console.log(result);
  response.flag = true;
  response.message = 'Ride request cancelled successful';
  response.ride = result;

  resolve(response);
})
.catch(err => {
  console.log(err)
  reject(error);
});
});
}

static acceptRideRequest(cust) {

  var response = {
      flag: false,
      message: 'Error'
  };

  const updateOps = {};

return new Promise(async(resolve, reject) => {
  
  
  var cst2 = await Ride.findOne({_id: cust.id, status: 'Pending'});

      if(cst2 == null)
      {
          response.message = 'Ride request not found';
          return reject(response);
      }

      updateOps['status'] = 'Accepted';

  Ride
  .update({_id: cust.id},{$set: updateOps})
.then(async(result) => {
  console.log(result);
  response.flag = true;
  response.message = 'Ride request accepted successful';
  response.ride = result;

  resolve(response);
})
.catch(err => {
  console.log(err)
  reject(error);
});
});
}
  static async get(id) {
    return Customer.findById(id);
  }


  static async verify(countryCode,phoneno)
    {
        var verifier = null;

        var response = {
            flag: true,
            message: "Verification started",
            data: verifier
        };
        
            verifier = await this.createVerifier(countryCode, phoneno);
            response.data = verifier;

        return response;
    }

    static async doverify(countryCode,phoneno,code)
    {
        //var verifier = null;

        const updateOps = {};

        var data = {
          driver: null,
            isVerified: false,
            isLogin: false,
            isSignup: false,
            countryCode: countryCode,
            phoneno: String(phoneno),
            verifier: null
        }

        var response = {
            data: data,
            message: 'Invalid Response',
            flag: false
        };

        

        
        var verifier = await Verifier.findOne({countryCode: countryCode, phoneno: phoneno, code: code});

        // var c = await Customer.findOne({countryCode: countryCode, phoneno: phoneno});
        
        // return verifier;

        if(verifier == null )
        {
            response.message = 'Record not found';
        }
        else
        {
            

            if(verifier.status == 'Unused')
            {   
                response.message = 'Driver verified successfully';

                response.data.isVerified = true;

                response.flag = true;

                updateOps['status'] = 'Used';

                await Verifier.update({_id: verifier._id},{$set: updateOps});

                var driver = await Driver.findOne({countryCode: countryCode, phoneno: phoneno});

                if(driver == null)
                {
                    response.data.isSignup = true;
                }
                else
                {
                    response.data.isLogin = true;
                    response.data.driver = driver;
                }
            }
            else
            {
                response.message = 'Verification failed';
            }
            
        }

        return response;
    }


    static async createVerifier(countryCode,phoneno)
  {
      const code = this.getRandomNumber(1001,9999);
    const verifier = new Verifier({
        countryCode: countryCode,
        phoneno: phoneno,
        code: code
    });

    return await verifier.save();
  }

  static getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    }

};

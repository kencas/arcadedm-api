const Status = require('../model/status');

module.exports = class TransactionLog { 
    
    constructor() {
      
    }
    
    static async saveData(data) {

        const transaction = new Status({
            longitude: data.longitude,
            latitude: data.latitude,
            referenceID: data.referenceID,
            status: data.status
        });

        let transact = await transaction.save();
      console.log(transact);
    }

    static async updateStatus(cust) {

        const updateOps = {};

        updateOps['status'] = cust.status;
        updateOps['latitude'] = cust.latitude;
        updateOps['longitude'] = cust.longitude;

  var transact = await Status
  .update({referenceID: cust.referenceID},{$set: updateOps})
      //console.log(transact);

      
      
    }

    static async getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    static async listNearby(data) {

        return await Status.find();
      
    }

    static async notifyDriver(ride)
    {
        var socket = io.connect('https://app9cab.herokuapp.com');
        socket.emit('create-ride-request', ride);
    }
  }
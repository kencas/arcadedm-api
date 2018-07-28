const Ledger = require('../model/ledger');

module.exports = class LedgerService{ 
    
    constructor() {
      
    }
    
    static create(led) {

      return new Promise((resolve, reject) => {
        const ledger = new Ledger({
            name: led.name,
            AccNo: led.AccNo,
            acctype: led.acctype,
            prefix: led.prefix
        });

        ledger
    .save()
    .then(result => {
        console.log(result);
        resolve(result);
    })
    .catch(err => {
        console.log(err)
        reject(err);
    });
      });
    }

    


    static update(id,inv) {

        return new Promise((resolve, reject) => {
        Ledger.update({_id: id},{$set: inv})
    .exec()
    .then(result => {
        console.log({
            message: "Channel updated successfuly",
            flag: true,
        }),
        resolve(result);
    })
    .catch(err => {
        console.log(err),
        reject(err)
    });

});

      }


    static async list() {

      
       
        return await Ledger.find();

      
    }

    static async get(id) {

      
       
      return await Ledger.findById(id);

    
  }
  }
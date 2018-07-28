const Store = require('../model/store');

module.exports = class StoreService{ 
    
    constructor() {
      
    }
    
    static create(store) {

      return new Promise((resolve, reject) => {
        const str = new Store({
            name: store.name,
            branch: store.branch,
            location: store.location,
            address: store.address,
            GLAccNo: store.GLAccNo,
            AccNo: store.AccNo
        });

        chan
    .save()
    .then(result => {
        console.log(result);
        resolve(result);
    })
    .catch(err => {
        console.log(err)
        reject(error);
    });
      });
    }

    


    static update(id,inv) {

        return new Promise((resolve, reject) => {
        Store.update({_id: id},{$set: inv})
    .exec()
    .then(result => {
        console.log({
            message: "Store updated successfuly",
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

      
       
        return await Store.find();

      
    }

    static async get(id) {

      
       
      return Store.findById(id);

    
  }
  }
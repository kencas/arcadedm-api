const Pricing = require('../model/prices');

module.exports = class PricingService{ 
    
    constructor() {
      
    }
    
    static create(led) {

        return new Promise((resolve, reject) => {
            const ledger = new Pricing({
                name: led.name,
                section: led.section,
                rate: led.rate
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
            Branch.update(
                inv,
                {returning: true, where: {id: id} }
              )
              .then(function(updatedBook) {
                resolve(updatedBook)
              })
    .catch(err => {
        console.log(err),
        reject(err)
    });

});

      }


    static async list() {

      
       
        return await Branch.find();

      
    }

    static async get(id) {

      
       
      //return Branch.findById(id);

      return await Branch.findById(id);

    
  }
  }
 const Pricing = require('../model/prices');
 const Status = require('../model/status');

module.exports = class Misc { 
    
    constructor() {
      
    }
    
    static async getPrice() {

    var prices = await Pricing.find();

    console.log(prices);

    var total= 0;

    return new Promise((resolve, reject) => {

    prices.map(function(e) {
        total += e.rate;
    });


    resolve(total);

    }); 

    }


    static async getPriceList() {

        return await Pricing.find();
    
    
        }

 
  }
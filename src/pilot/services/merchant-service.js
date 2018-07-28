const Merchant= require('../model/merchant');

module.exports = class CustomerService{ 
    
    constructor() {
      
    }
    
    static create(cust) {

        var response = {
            flag: false,
            message: 'Error signing up',
            merchant: null
        };

        

      return new Promise(async(resolve, reject) => {
        const merchant = new Merchant({
            name: cust.name,
            address: cust.address,
            location: cust.location,
            state: cust.state,
            email: cust.email,
            phoneno: cust.phoneno,
            image: cust.image
        });


        merchant
    .save()
    .then(async(result) => {
        console.log(result);
        response.flag = true;
        response.message = 'Merchant registered successfully';
        response.merchant = result;

        
        resolve(response);
    })
    .catch(err => {
        console.log(err)
        reject(error);
    });
      });
    }

    


    static async list() {

      
       
        return Merchant.find();

      
    }

    static async get(id) {

      
       
      return Merchant.findById(id);

    
  }

  
  }
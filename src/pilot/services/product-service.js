const Product = require('../model/product');

module.exports = class ProductService{ 
    
    constructor() {
      
    }
    
    static create(cust) {

        var response = {
            flag: false,
            message: 'Error signing up',
            product: null
        };

        

      return new Promise(async(resolve, reject) => {
        const product = new Product({
            name: cust.name,
            description: cust.description,
            details: cust.details,
            merchant: cust.merchant,
            category: cust.category,
            image: cust.image
        });


        product
    .save()
    .then(async(result) => {
        console.log(result);
        response.flag = true;
        response.message = 'Product created successfully';
        response.product = result;

        
        resolve(response);
    })
    .catch(err => {
        console.log(err)
        reject(error);
    });
      });
    }

    


    static async list() {

      
       
        return Product.find().populate('merchant');

      
    }

    static async get(id) {

      
       
      return Product.findById(id);

    
  }

  
  }
const Category = require('../model/category');

module.exports = class CategoryService{ 
    
    constructor() {
      
    }
    
    static create(cust) {

        var response = {
            flag: false,
            message: 'Error signing up',
            category: null
        };

        

      return new Promise(async(resolve, reject) => {
        const category = new Category({
            name: cust.name,
            image: cust.image
        });


        category
    .save()
    .then(async(result) => {
        console.log(result);
        response.flag = true;
        response.message = 'Category created successfully';
        response.category = result;

        
        resolve(response);
    })
    .catch(err => {
        console.log(err)
        reject(error);
    });
      });
    }

    


    static async list() {

      
       
        return Category.find();

      
    }

    static async get(id) {

      
       
      return Category.findById(id);

    
  }

  
  }
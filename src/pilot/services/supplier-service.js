const Supplier = require('../model/supplier');
const Misc =  require('../classes/misc');

module.exports = class BranchService{ 
    
    constructor() {
      
    }
    
    static create(supply) {

      return new Promise(async(resolve, reject) => {
        

        const account = {
            name: supply.name,
            section: supply.section
        };

        let accc = await Misc.createAccount(account);

        const supplier = new Supplier({
            name: supply.name,
            address: supply.address,
            city: supply.city,
            state: supply.state,
            phoneno: supply.phoneno,
            email: supply.email,
            GLAccNo: accc.GLAccNo,
            AccNo: accc.accountNo,
            section: supply.section
        });

        supplier
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
        Supplier.update({_id: id},{$set: inv})
    .exec()
    .then(result => {
        console.log({
            message: "Investment updated successfuly",
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

      
       
        return await Supplier.find();

      
    }

    static async get(id) {

      
       
      return Supplier.findById(id);

    
  }
  }
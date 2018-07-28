const Merchant = require('../model/merchant');
const Verifier =  require('../model/verifier');

module.exports = class MerchantService{ 
    
    constructor() {
      
    }
    
    static create(cust) {

        var response = {
            flag: false,
            message: 'Error signing up',
            customer: null
        };

        const updateOps = {};

      return new Promise(async(resolve, reject) => {
        const customer = new Merchant({
            name: cust.name,
            address: cust.address,
            location: cust.location,
            state: cust.state,
            email: cust.email,
            phoneno: cust.phoneno,
            code: cust.code
        });

        var cst = await Verifier.findOne({countryCode: cust.countryCode, phoneno: Number(cust.phoneno), code: cust.code});

        if(cst == null)
        {
            response.message = 'Invalid Verification Code';
            return reject(response);
        }

        var cst2 = await Verifier.findOne({countryCode: cust.countryCode, phoneno: Number(cust.phoneno), code: cust.code, isVerified: 'N', status: 'Used'});

        if(cst2 == null)
        {
            response.message = 'Verification Code not Verified';
            return reject(response);
        }
        

        customer
    .save()
    .then(async(result) => {
        console.log(result);
        response.flag = true;
        response.message = 'Customer registered successfully';
        response.customer = result;

        updateOps['isVerified'] = 'Used';

        await Verifier.update({_id: cst._id},{$set: updateOps});

        resolve(response);
    })
    .catch(err => {
        console.log(err)
        reject(error);
    });
      });
    }

    static async verify(countryCode,phoneno)
    {
        var verifier = null;

        var response = {
            canVerify: true,
            countryCode: countryCode,
            phoneno: phoneno,
            verifier: verifier
        };
        
            verifier = await this.createVerifier(countryCode, phoneno);
            response.canVerify = true;
            response.verifier = verifier;

        return response;
    }

    static async doverify(countryCode,phoneno,code)
    {
        //var verifier = null;

        const updateOps = {};

        var response = {
            customer: null,
            isVerified: false,
            isLogin: false,
            isSignup: false,
            countryCode: countryCode,
            phoneno: String(phoneno),
            verifier: null,
            message: 'Invalid Response',
            code: code
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
                response.verifier = verifier;
                
                response.message = 'Customer verified successfully';

                response.isVerified = true;

                updateOps['status'] = 'Used';

                await Verifier.update({_id: verifier._id},{$set: updateOps});

                var customer = await Customer.findOne({countryCode: countryCode, phoneno: phoneno});

                if(customer == null)
                {
                    response.isSignup = true;
                }
                else
                {
                    response.isLogin = true;
                    response.customer = customer;
                }
            }
            else
            {
                response.message = 'Verification failed';
            }
            
        }

        return response;
    }

    static async signup(cust)
    {
        var verifier = null;

        var response = {
            canVerify: true,
            countryCode: countryCode,
            phoneno: phoneno,
            verifier: verifier
        };
        
        const customer = new Customer({
            firstname: cust.firstname,
            lastname: cust.lastname,
            countryCode: cust.countryCode,
            email: cust.email,
            phoneno: cust.phoneno,
            code: cust.code
        });

        

        //await = 
            

        return response;
    }


    static async list() {

      
       
        return Customer.find();

      
    }

    static async get(id) {

      
       
      return Customer.findById(id);

    
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
  }
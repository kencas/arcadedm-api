const Account = require('../model/account');
const AccType = require('../model/acctype');
const Transaction = require('../model/transaction');
const Posting = require('../model/posting');
const Ledger = require('../model/ledger');

module.exports = class AccountService{ 
    
    constructor() {
      
    }


static async createAccount(acctype,req)
{
    const account = new Account({
        name: req.body.name,
        acctype: req.body.acctype,
        customer: req.body.customerID,
        accountNo: acctype.prefix + this.zeroPad(acctype.index,5),
        ledger: acctype.ledger
    });

     let acc = await account.save();

     if(acc)
     {
        await AccType.update({_id: acctype._id},{$set: {index: acctype.index}});
     }
        
     return acc;
    
}

 static zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }

  static async list() {

      
       
    return await Account.find()
    .populate('customer acctype ledger','name firstname middlename lastname');

  
}

static async listTransaction() {

      
    var transact = await Transaction.find()
    .populate('posting');

    //var postings = await this.listPosting(transact._id);

    return transact;

  
}

static async getTransaction(transactionID) {

      
    var transact = await Transaction.findOne({_id: transactionID});

    var postings = await this.listPosting(transact._id);

    const transactionn = {
        "transaction": transact,
        "postings": postings
    };

    return transactionn;

  
}

static async listPosting(transactionID) {

      
       
    return Posting.find({transaction: transactionID});

  
}

static async postTransaction(req) {

    const transaction = new Transaction({
        amount: req.body.amount,
        referenceID: req.body.referenceID,
        reference: req.body.reference
    });

    const account = await this.getAccount(req.body.accountNo);

    const contra = await this.getLedger(req.body.contraNo);

    let transact = await transaction.save();

    let main = null;

    let ctn = null;

    if(transact)
    {
        main = new Posting({
            accountNo: account.accountNo,
            identifier: account.acctype.identifier,
            section: account.acctype.section,
            amount: req.body.amount,
            transaction: transact._id,
            referenceID: req.body.referenceID,
            reference: req.body.reference,
            tag: 'Main'
        });

        ctn = new Posting({
            accountNo: contra.accountNo,
            identifier: contra.identifier,
            section: contra.section,
            amount: req.body.amount,
            transaction: transact._id,
            referenceID: req.body.referenceID,
            reference: req.body.reference,
            tag: 'Contra'
        });

        await main.save();
        await ctn.save();

        transact.postings.push(main._id);
        transact.postings.push(ctn._id);
    }
  //console.log(transact);

  const transactions = {
      "transaction": transact,
      "main": main,
      "contra": ctn
  }
  

  return transactions;
}

static async getAccount(accountNo) {

      
       
    return Account.findOne({accountNo: accountNo}).populate('acctype','identifier section');

  
}


static async getLedger(accountNo) {

      
       
    return Ledger.findOne({accountNo: accountNo});

  
}

}
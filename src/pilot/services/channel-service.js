const Channel = require('../model/channel');

module.exports = class ChannelService{ 
    
    constructor() {
      
    }
    
    static create(channel) {

      return new Promise((resolve, reject) => {
        const chan = new Channel({
            name: channel.name,
            GLAccNo: channel.GLAccNo
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
        Channel.update({_id: id},{$set: inv})
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

      
       
        return await Channel.find();

      
    }

    static async get(id) {

      
       
      return Channel.findById(id);

    
  }
  }
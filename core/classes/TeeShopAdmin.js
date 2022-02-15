const path = require('path')
const TeeShopObject = require(path.join(__dirname,"TeeShopObject"))
const TeeShopUser = require(path.join(__dirname,"TeeShopUser"))
class TeeShopAdmin extends TeeShopUser{


    initDeeBee(){
        if(this.config.db){
            
        }
    }

    constructor(config,data){
        super(config,data)
    }

}

module.exports = TeeShopAdmin
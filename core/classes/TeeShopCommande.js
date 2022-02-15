const path = require('path')
const TeeShopObject = require(path.join(__dirname,"TeeShopObject"))

class TeeShopCommande extends TeeShopObject{


    initDeeBee(){
        if(this.config.db){
            
        }
    }

    init(){
        
    }

    constructor(config,data){
        super(config,data)
    }

}

module.exports = TeeShopCommande
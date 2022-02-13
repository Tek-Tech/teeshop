const path = require('path')
const TeeShopObject = require(path.join(__dirname,"TeeShopObject"))

class TeeShopCart extends TeeShopObject{


    initDeeBee(){
        if(this.config)
    }

    init(){
        
    }

    constructor(config,data){
        super(config,data)
    }

}

module.exports = TeeShopCart
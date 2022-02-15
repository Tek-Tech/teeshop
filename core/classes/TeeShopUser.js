const path = require('path')
const TeeShopObject = require(path.join(__dirname,"TeeShopObject"))

class TeeShopAdmin extends TeeShopObject{


    initDeeBee(){
        if(this.config.db){
            
        }
    }

    init(){
     
        this.initDeeBee()
        
    }

    constructor(config,data){
        super(config,data)
        this.init()
    }

}

module.exports = TeeShopAdmin
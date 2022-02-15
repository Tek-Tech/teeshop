const path = require('path')
const TeeShopObject = require(path.join(__dirname,"TeeShopObject"))

class TeeShopCategorie extends TeeShopObject{


    checkDeeBee(){
        return this.config.db
    }

    init(){
        if  (this.checkDeeBee())    this.setReady()  
        else this.waitForDeeBee()
    }


    constructor(config,data){
        super(config,data)
    }

}

module.exports = TeeShopCategorie
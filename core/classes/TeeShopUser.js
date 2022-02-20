if((typeof module)!='undefined'){
    var path = require('path')
    var TeeShopObject = require(path.join(__dirname,"TeeShopObject"))
}
class TeeShopUser extends TeeShopObject{


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
if((typeof module)!='undefined'){
    module.exports = TeeShopUser
}
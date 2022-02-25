if((typeof module)!='undefined'){
    var path = require('path')
    var TeeShopUser = require(path.join(__dirname,"TeeShopUser"))
}
class TeeShopAdmin extends TeeShopUser{


    initDeeBee(){
        if(this.config.db){
            
        }
    }

    constructor(config,data){
        super(config,data)
    }

}
if((typeof module)!='undefined'){
    module.exports = TeeShopAdmin
}
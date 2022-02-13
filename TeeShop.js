const DeeBee = require("@tek-tech/deebee")
class TeeShop{


    
    constructor(dbcreds={}){
        this.database = new DeeBee(dbcreds);
        
    }

}

module.exports = TeeShop
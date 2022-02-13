const DeeBee = require("@tek-tech/deebee")
const {Ear} = require("@tek-tech/ears")

class TeeShop extends Ear{


    initDeeBee(dbcreds={}){
        this.database = new DeeBee(dbcreds);
        this.whenDatabaseReady(
            ()=>{
                this.dbready = 1 
                console.log("database ready")
            }
        )
    }
    whenDatabaseReady(action){
        this.database.whenReady(
            action
        )
    }
    init(dbcreds){
        this.initDeeBee(dbcreds)
    
        this.whenReady(
            ()=>{
                console.log("i am ready")
            }
        )
    }
    constructor(dbcreds){
        super()
        this.init(dbcreds)
    }

}

module.exports = TeeShop

let tshop = new TeeShop({host:'127.0.0.1',user:'root',database:'tek_tech',password:''})
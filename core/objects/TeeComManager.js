
const path = require('path')
const classespath = path.join(__dirname,"..","classes")
const TeeShopObject = require(path.join(classespath,"TeeShopObject"))

class TeeComManager extends TeeShopObject{


    _new(userid,cb){
        this.whenGotDeeBee(
            ()=>{
                this.database._addCom(
                    {userid},(e,r)=>{
                        if(e)console.log(e)
                        this.config.shop.setData(cb)
                    }
                )
            }
        )
    }

    getCommande(id,userid,cb){
        let found = null
        this.getCommandes(
            coms=>{
                coms.forEach(
                    com=>{
                        if (com.getData(userid?'userid':'id') == userid?userid:id) found = com
                    }
                )
                cb(found)
            }
        )
    }
    getCommandes(cb){
        this.whenGotDeeBee(
            ()=>{
                cb(this.getData('commandes'))
            }
        )
    }
    updateCommandes(cb){
        this.getCommandes(
            coms=>{
                coms.forEach(
                    (com,idx)=>{
                        com.setData(
                            ()=>{
                                if(idx+1==coms.length)cb(this)
                            }
                        )
                    }
                )
            }
        )
    }
    init(cb){
        this.whenGotDeeBee(
            ()=>{
                this.updateCommandes(
                    ()=>{
                        this.setReady()
                        if(cb)cb(this)
                    }
                )
            }
        )
    }


    constructor(config,data){
        super(config,data) 
        this.waitForDeeBee()
        this.init()
    }

}
module.exports = TeeComManager
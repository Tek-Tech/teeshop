const path = require('path')
const TeeShopObject = require(path.join(__dirname,"TeeShopObject"))


class TeeShopArticle extends TeeShopObject{


    addToCat(catid,cb){

    }

    delFromCat(catid,cb){

    }

    addToCom(comid,cb){

    }

    delFromCom(comid,cb){

    }

    whenGotData(cb){
        if(this.gotdata){
            cb()
        }else{
            this.when(
                'gotdata',cb
            )
        }
    }

    gotData(){
        return this.gotdata 
    }

    addTo(target,targetid,cb){
        if(target == 'cat' || target == 'com'){
            if(target == 'cat') this.addToCat(targetid,cb)
            if(target == 'com') this.addToCom(targetid,cb)
        }
    }

    delFrom(target,targetid,cb){
        if(target == 'cat' || target == 'com'){
            if(target == 'cat') this.delFromCat(targetid,cb)
            if(target == 'com') this.delFromCom(targetid,cb)
        }
    }

    initDeeBee(cb){
        this.whenGotDeeBee(
            ()=>{
                if(cb)cb()
            }
        )
    }

    init(){
        
    }

    constructor(config,data){
        super(config,data)
        this.gotdata = false
        this.waitForDeeBee()
        this.initDeeBee()
    }


}


module.exports = TeeShopArticle
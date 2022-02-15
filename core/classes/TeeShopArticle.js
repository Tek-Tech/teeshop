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


module.exports = TeeShopArticle
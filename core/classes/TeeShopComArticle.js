const path = require('path')
const TeeShopArticle = require(path.join(__dirname,'TeeShopArticle'))

class TeeShopComArticle extends TeeShopArticle{

    isComArticle = true

    addTo(catid,cb){
        super.addTo(
            'cat',catid,cb
        )
    }

    delFrom(catid,cb){
        super.delFrom(
            'cat',catid,cb
        )
    }


    constructor(config,data){
        super(config,data)
    }

}

module.exports = TeeShopComArticle
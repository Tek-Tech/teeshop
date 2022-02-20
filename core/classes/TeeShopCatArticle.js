const path = require('path')
const TeeShopArticle = require(path.join(__dirname,'TeeShopArticle'))

class TeeShopCatArticle extends TeeShopArticle{


    isCatArticle = true

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

    setData(cb){
        const id = this.getId()
        this.whenGotDeeBee(
            ()=>{
                this.database._getProd(
                    id,(e,article)=>{
                        this.article = article
                        this._data.article = article
                        this.gotdata = true 
                        this.trigger('gotdata')
                        if(cb)cb(this.article)
                    }
                )

            }
        )
    }

    getArticle(){
        return this.getData('article')
    }

    getId(){
        return this.articleid
    }


    constructor(config,data){
        super(config,data)
        this.gotdata = false
        this.setData()
    }

}

module.exports = TeeShopCatArticle
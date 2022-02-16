const path = require('path')
const TeeShopObject = require(path.join(__dirname,"TeeShopObject"))

class TeeShopCommande extends TeeShopObject{


    articles(cb){
        this.database._getComProds(
            this.getData('id'),(e,r)=>{
                if(e)console.log(e)
                this.articles = r
                if(cb)cb(this.articles)
            }
        )
    }
    getData(name){
        return this.hasOwnProperty('_data') ? this._data.hasOwnProperty(`${name}`) ? this._data[name] : null : null
    }
    init(cb){
        this.whenGotDeeBee(
            ()=>{
                this.setReady()
                this.articles(
                    articles=>{
                        if(cb)cb(articles)
                    }
                )
            }
        )
    }

    addArticle({nom,prix},cb){
        this.whenGotDeeBee(
            ()=>{
                this.database._addProd({nom,prix},(e,r)=>{
                    if(e)cb(e,null)
                    else this.database._linkProd(
                        'commandes',this.getData('id'),r.insertId,cb
                    )
                })
            }
        )
    }

    constructor(config,data){
        super(config,data)
        this.waitForDeeBee()
        this.init()
    }


}

module.exports = TeeShopCommande
const path = require('path')
const TeeShopObject = require(path.join(__dirname,"TeeShopObject"))

class TeeShopCategorie extends TeeShopObject{

    whenGotArticles(cb){
        
        this.when(
            'gotarticles',cb
        )

    }

    articles(cb){
        this.whenGotDeeBee(
            ()=>{
                this.database._getCatProds(
                    this.getData('id'),(e,r)=>{
                        if(e)console.log(e)
                        this._data.articles = r
                        if(cb)cb(this._data.articles)
                    }
                )
            }
        )
    }

    init(cb){
        this.whenGotDeeBee(
            ()=>{
                this.setReady()
                this.articles(
                    articles=>{
                        this.gotarticles = true
                        this.trigger(
                            'gotarticles',articles
                        )
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
                        'categories',this.getData('id'),r.insertId,cb
                    )
                })
            }
        )
    }

    getArticle(id,cb,name){
        this.whenGotArticles(
            ()=>{
                let art = null
                this.getData('articles').forEach(
                    article=>{
                        if(article.getArticle().getData(name?'name':'id')==name?name:id) art = article
                    }
                )
                cb(art)
            }
        )
    }

    constructor(config,data){
        super(config,data) 
        this.waitForDeeBee()
        this.init()
    }

}

module.exports = TeeShopCategorie
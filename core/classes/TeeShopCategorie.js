const path = require('path')
const TeeShopObject = require(path.join(__dirname,"TeeShopObject"))

class TeeShopCategorie extends TeeShopObject{

    
    whenGotArticles(cb){
        if(!this.gotArticles()){
            this.when(
                'gotarticles',cb
            )
            return
        }
        this.getArticles(cb)
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

    gotArticles(){
        return this.getData('articles')
    }

    setData(cb){
        this.articles(
            articles=>{
                this.gotarticles = true
                this.trigger(
                    'gotarticles',articles
                )
                if(cb)cb(this._data)
            }
        )
    }

    init(cb){
        this.whenGotDeeBee(
            ()=>{
                this.setData(
                    ()=>{
                        this.setReady()
                        if  (cb)  cb(this._data)
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
                        'categories',this.getData('id'),r.insertId,(e,r)=>{
                            
                            cb(e,r)
                        
                        }
                    )
                })
            }
        )
    }

    getArticles(cb){
        this.whenGotArticles(
            cb
        )
    }

    getArticle(id,cb,name){
        this.getArticles(
            articles=>{
                let art = null
                articles.forEach(
                    article=>{
                        if(article.getArticle().getData(name?'name':'id')==name?name:id) art = article
                    }
                )
                if  (cb)  cb(art)
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
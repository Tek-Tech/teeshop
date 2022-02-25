const path = require('path')
const TeeShopObject = require(path.join(__dirname,"TeeShopObject"))

class TeeShopCommande extends TeeShopObject{

    whenGotArticles(cb){
        if(!this.gotArticles()){
            this.when(
                'gotarticles',cb
            )
            return
        }
        this.getArticles(cb)
    }

    whenGotUser(cb){
        if(!this.gotUser()){
            this.when(
                'gotuser',cb
            )
            return
        }
        this.getUser(cb)
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

    user(cb){
        const id = this.getData('userid')
        this.database._getCli(
            id,(e,user)=>{
                if(e)console.log(e)
                this._data.user = user
                if(cb)cb(this._data.user)
            }
        )
    }

    gotArticles(){
        return this.getData('articles')
    }
    
    gotUser(){
        return this.getData('user')
    }

    setUser(cb){
        this.user(
            (user)=>{
                this.gotuser = true
                this.trigger(
                    'gotuser',user
                )
                if(cb)cb(this)
            
            }
        )
    }
    setData(cb){
        this.articles(
            articles=>{
                this.gotarticles = true
                this.trigger(
                    'gotarticles',articles
                )
                if(cb)cb(this)
                this.setUser(
                    ()=>{
                        if(cb)cb(this)
                    }
                )
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

    addArticle(id,quantite,cb){
        this.whenGotDeeBee(
            ()=>{
                this.database._linkComProd(
                    'commandes',this.getData('id'),id,quantite,()=>{
                        this.setData(
                            ()=>{
                                cb(e,r)
                            }
                        )
                    }
                )
            }
        )
    }

    getArticles(cb){
        this.whenGotArticles(
            cb
        )
    }

    getUser(cb){
        this.whenGotUser(
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

module.exports = TeeShopCommande
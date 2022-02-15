const path = require('path')
const TeeShopObject = require(path.join(__dirname,"TeeShopObject"))

class TeeShopCategorie extends TeeShopObject{


    whenGotDeeBee(cb){
        this.when(
            'gotdeebee',cb
        )
    }

    waitForDeeBee(){
        this.waitdbinterval = setInterval(
            ()=>{
                if(this.config.hasOwnProperty('db')){
                    this.database = this.config.db
                    this.trigger('gotdeebee','ok')
                    clearInterval(this.waitdbinterval)
                }
            },1000
        )
    }

    articles(cb){
        this.whenGotDeeBee(
            ()=>{
                this.database._getCatProds(
                    this.getData('id'),(e,r)=>{
                        if(e)console.log(e)
                        this.articles = r
                        if(cb)cb(this.articles)
                    }
                )
            }
        )
    }

    assignData(rawdata){
        this._data = this.hasOwnProperty('_data') ? this._data : {} 
        Object.keys(this.rawdata).forEach(
            key=>{
                this._data[key] = this.rawdata[key]
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
                        'categories',this.getData('id'),r.insertId,cb
                    )
                })
            }
        )
    }


    constructor(config,data){
        super(config,data)
        this.assignData() 
        this.waitForDeeBee()
        this.init()
    }

}

module.exports = TeeShopCategorie
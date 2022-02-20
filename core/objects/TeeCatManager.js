
const path = require('path')
const classespath = path.join(__dirname,"..","classes")
const TeeShopObject = require(path.join(classespath,"TeeShopObject"))

class TeeCatManager extends TeeShopObject{


    _new(nom,illu,cb){
        this.whenGotDeeBee(
            ()=>{
                this.database._addCat(
                    {nom,illu},(e,r)=>{
                        if(e)console.log(e)
                        this.config.shop.setData(cb)
                    }
                )
            }
        )
    }

    getCategorie(id,name,cb){
        let found = null
        this.getCategories(
            cats=>{
                cats.forEach(
                    cat=>{
                        const searchee = cat.getData(name?'nom':'id')
                        const search = name?name:id
                        if (searchee == search) {
                            cb(cat)
                        }
                    }
                )
                if(!found && cb) cb(found)
            }
        )
    }
    getCategories(cb){
        this.whenGotDeeBee(
            ()=>{
                cb(this.getData('categories'))
            }
        )
    }
    updateCategories(cb){
        this.getCategories(
            cats=>{
                cats.forEach(
                    (cat,idx)=>{
                        cat.setData(
                            ()=>{
                                if(idx+1==cats.length)cb(this)
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
                this.updateCategories(
                    ()=>{
                        this.setReady()
                        if(cb)cb(this)
                        console.log('ready')
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
module.exports = TeeCatManager
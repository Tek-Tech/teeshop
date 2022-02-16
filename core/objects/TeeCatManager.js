
const path = require('path')
const classespath = path.join(__dirname,"..","classes")
const TeeShopObject = require(path.join(classespath,"TeeShopObject"))

class TeeCatManager extends TeeShopObject{


    getCategorie(id,name,cb){
        let found = null
        this.getCategories(
            cats=>{
                cats.forEach(
                    cat=>{
                        if (cat.getData(name?'name':'id') == name?name:id) found = cat
                    }
                )
                cb(found)
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
                    cat=>{
                        
                    }
                )
            }
        )
    }
    init(cb){
        this.whenGotDeeBee(
            ()=>{
                this.setReady()
            }
        )
    }


    constructor(config,data){
        super(config,data)
        super(config,data) 
        this.waitForDeeBee()
        this.init()
    }

}
module.exports = TeeCatManager
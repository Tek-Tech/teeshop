
const path = require('path')
const classespath = path.join(__dirname,"..","classes")
const objectspath = path.join(__dirname,'..','objects')
const TeeData = require(path.join(objectspath,'TeeData'))


class TeeShopData extends TeeData{
    

    static actions = [
        {
            name:'_getProds',cb:function (cb){
                const req = this.__selectFrom(TeeData._n_t().articles.name,['*'])
                this._db().query(
                    req,cb
                )
            }
        },
        {
            name:'_getProd'
            ,cb:function (name,cb){
                const req = this.__selectFrom(TeeData.knowntables.articles,['*'],[['nom'],[`${name}`]])
                this._db().query(
                    req,cb
                )
            }
        }
    ]

    initialize(cb){
        this.configureActions(...TeeShopData.actions)
        if(cb)cb()
    }


    constructor(creds={},tables=[]){
    
        super(creds,tables.length?tables:TeeData._tables()?TeeData._tables():[])


        this.initialize(()=>{
            console.log('implemented custom DeeBee actions')
        })

    }
}

module.exports = TeeShopData
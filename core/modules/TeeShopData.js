
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
            ,cb:function (id,cb){
                const req = this.__selectFrom(TeeData.knowntables.articles,['*'],[['nom'],[`${id}`]])
                this._db().query(
                    req,cb
                )
            }
        },
        {
            name:'_getProdByName'
            ,cb:function (name,cb){
                const req = this.__selectFrom(TeeData.knowntables.articles,['*'],[['nom'],[`${name}`]])
                this._db().query(
                    req,cb
                )
            }
        },
        {
            name:'_addProd'
            ,cb:function ({nom,prix},cb){
                const req = this.__insertINTO(TeeData.knowntables.articles,['nom','prix'],[`${nom}`,`${prix}`])
                this._db().query(
                    req,cb
                )
            }
        },
        {
            name:'_getClis',cb:function (cb){
                const req = this.__selectFrom(TeeData._n_t().clients.name,['*'])
                this._db().query(
                    req,cb
                )
            }
        },
        {
            name:'_getCli',cb:function (id,cb){
                const req = this.__selectFrom(TeeData._n_t().clients.name,['*'],[['id'],[id]])
                this._db().query(
                    req,cb
                )
            }
        },
        {
            name:'_getSpecificCli',cb:function (conds,cb){
                const req = this.__selectFrom(TeeData._n_t().clients.name,['*'],conds)
                this._db().query(
                    req,cb
                )
            }
        },
        {
            name:'_getComs',cb:function (cb){
                const req = this.__selectFrom(TeeData._n_t().commandes.name,['*'])
                this._db().query(
                    req,cb
                )
            }
        },
        {
            name:'_getCom',cb:function (id,cb){
                const req = this.__selectFrom(TeeData._n_t().commandes.name,['*'],[['id'],[id]])
                this._db().query(
                    req,cb
                )
            }
        },
        {
            name:'_getSpecificCom',cb:function (conds,cb){
                const req = this.__selectFrom(TeeData._n_t().commandes.name,['*'],conds)
                this._db().query(
                    req,cb
                )
            }
        },
        {
            name:'_getAdms',cb:function (cb){
                const req = this.__selectFrom(TeeData._n_t().admins.name,['*'])
                this._db().query(
                    req,cb
                )
            }
        },
        {
            name:'_getAdm',cb:function (id,cb){
                const req = this.__selectFrom(TeeData._n_t().admins.name,['*'],[['id'],[id]])
                this._db().query(
                    req,cb
                )
            }
        },
        {
            name:'_getSpecificAdm',cb:function (conds,cb){
                const req = this.__selectFrom(TeeData._n_t().admins.name,['*'],conds)
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
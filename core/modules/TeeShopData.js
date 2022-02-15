
const path = require('path')
const classespath = path.join(__dirname,"..","classes")
const objectspath = path.join(__dirname,'..','objects')
const TeeData = require(path.join(objectspath,'TeeData'))


class TeeShopData extends TeeData{
    
    static actions = [
        {
            name:'__cliCreds',cb:function ({user,pass},cb){
                const req = this.__selectFrom(TeeData._n_t().clients.name,['*'],[[this._getUsersLogField(),this._getUsersPasswField()],[`'${user}'`,`MD5('${pass}')`]])
                this._db().query(
                    req,cb
                )
            }
        },{
            name:'__admCreds',cb:function ({user,pass},cb){
                const req = this.__selectFrom(TeeData._n_t().admins.name,['*'],[[this._getAdminsLogField(),this._getAdminsPasswField()],[`'${user}'`,`MD5('${pass}')`]])
                this._db().query(
                    req,cb
                )
            }
        },{
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
                const req = this.__selectFrom(TeeData.knownTables.articles.name,['*'],[['nom'],[`${id}`]])
                this._db().query(
                    req,cb
                )
            }
        },
        {
            name:'_getProdByName'
            ,cb:function (name,cb){
                const req = this.__selectFrom(TeeData.knownTables.articles.name,['*'],[['nom'],[`${name}`]])
                this._db().query(
                    req,cb
                )
            }
        },
        {
            name:'_addProd'
            ,cb:function ({nom,prix},cb){
                const req = this.__insertINTO(TeeData.knownTables.articles.name,['nom','prix'],[`${nom}`,`${prix}`])
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
            name:'_addCli'
            ,cb:function ({nom,prenom,username,adresse,telephone,mail,password},cb){
                const req = this.__insertINTO(TeeData.knownTables.clients.name,['nom','prenom','username','adresse','telephone','mail','password'],[`'${nom}'`,`'${prenom}'`,`'${username}'`,`'${adresse}'`,`'${telephone}'`,`'${mail}'`,`MD5('${password}')`])
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
            name:'_addAdm'
            ,cb:function ({nom,prenom,username,adresse,telephone,mail,password},cb){
                const req = this.__insertINTO(TeeData.knownTables.admins.name,['nom','prenom','username','adresse','telephone','mail','password'],[`'${nom}'`,`'${prenom}'`,`'${username}'`,`'${adresse}'`,`'${telephone}'`,`'${mail}'`,`MD5('${password}')`])
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


    processUserData(userdata,admin=false){

        let returned = {} 
        Object.keys(userdata).forEach(
            info=>{
                if(info!=='password') returned[info] = userdata[info]
            }
        )
        userdata=returned
        const usertype = this.shop.core.getObject(`TeeShop${admin?'Admin':'User'}`)
        return usertype ? new usertype.class({db:this},userdata) : userdata

    }


    initialize(cb){
        this.configureActions(...TeeShopData.actions)
        if(cb)cb()
    }


    constructor(shop,creds={},tables=[]){
    
        super(creds,tables.length?tables:TeeData._tables()?TeeData._tables():[])

        this.shop = shop
        this._setUsersTable(TeeData._n_t().clients.name)
        this._setAdminsTable(TeeData._n_t().admins.name)
        
        this._setUsersLogField("username")
        this._setAdminsTable("password")
        
        this._setAdminsLogField("username")
        this._setAdminsPasswField("password")
        

        this.initialize(()=>{
            console.log('implemented custom DeeBee actions')
        })

    }
}

module.exports = TeeShopData

const path = require('path')
const objectspath = path.join(__dirname,'..','objects')
const classespath = path.join(__dirname,"..","classes")
const TeeShopObject = require(path.join(classespath,"TeeShopObject"))
const TeeData = require('@tek-tech/teedata')


class TeeShopData extends TeeData{
    
    static actions = [
        {
            name:'__cliCreds',cb:function ({user,pass},cb){
                const req = this.__selectFrom(TeeData._n_t().clients.name,['*'],[[this._getUsersLogField(),this._getUsersPasswField()],[`'${user}'`,`MD5('${pass}')`]])
                this._db().query(
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>{return this.processUserData(elem)}
                        )
                        if(cb)cb(e,r)
                    }
                )
            }
        },{
            name:'__admCreds',cb:function ({user,pass},cb){
                const req = this.__selectFrom(TeeData._n_t().admins.name,['*'],[[this._getAdminsLogField(),this._getAdminsPasswField()],[`'${user}'`,`MD5('${pass}')`]])
                this._db().query(
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>{return this.processUserData(elem,true)}
                        )
                        if(cb)cb(e,r)
                    }
                )
            }
        },{
            name:'_getProds',cb:function (cb){
                const req = this.__selectFrom(TeeData._n_t().articles.name,['*'])
                this._db().query(
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>{return this.processRawData(elem,'Article')}
                        )
                        if(cb)cb(e,r)
                    }
                )
            }
        },
        {
            name:'_getProd'
            ,cb:function (id,cb){
                const req = this.__selectFrom(TeeData.knownTables.articles.name,['*'],[['id'],[`${id}`]])
                this._db().query(
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>{return this.processRawData(elem,'Article')}
                        )
                        if(cb)cb(e,r)
                    }
                )
            }
        },
        {
            name:'_getProdByName'
            ,cb:function (name,cb){
                const req = this.__selectFrom(TeeData.knownTables.articles.name,['*'],[['nom'],[`'${name}'`]])
                this._db().query(
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>{return this.processRawData(elem,'Article')}
                        )
                        if(cb)cb(e,r)
                    }
                )
            }
        },
        {
            name:'_addProd'
            ,cb:function ({nom,prix,illu},cb){
                const req = this.__insertINTO(TeeData.knownTables.articles.name,['nom','prix','illu'],[`'${nom}'`,`'${prix}'`,`'${illu}'`])
                this._db().query(
                    req,cb
                )
            }
        },
        {
            name:'_linkProd'
            ,cb:function (target,targetid,prodid,cb){
                if(!TeeData.knownTables.hasOwnProperty(target))cb('target not known',null)
                else{
                    const req = this.__insertINTO(TeeData.knownTables[`articles_${target}`].name,[`${target.replace(target.charAt(target.length-1),'')}id`,'articleid'],[`${targetid}`,`${prodid}`])
                    
                    this._db().query(

                        req,cb
                    )
                }
            }
        },
        {
            name:'_linkComProd'
            ,cb:function (target,targetid,prodid,quantite,cb){
                if(!TeeData.knownTables.hasOwnProperty(target))cb('target not known',null)
                else{
                    const req = this.__insertINTO(TeeData.knownTables[`articles_${target}`].name,[`${target.replace(target.charAt(target.length-1),'')}id`,'articleid','quantite'],[`${targetid}`,`${prodid}`,`${quantite}`])
                    
                    this._db().query(

                        req,cb
                    )
                }
            }
        },
        {
            name:'_addCatProd'
            ,cb:function (catid,{nom,prix,illu},cb){
                this._addProd(
                    {nom,prix,illu},(e,r)=>{
                        if(e)cb(e,r)
                        else{
                            this._linkProd(
                                'categories',catid,r.insertId,cb
                            )
                        }
                    }
                )
            }
        },
        {
            name:'_addComProd'
            ,cb:function (comid,{nom,prix},cb){
                this._addProd(
                    {nom,prix},(e,r)=>{
                        if(e)cb(e,r)
                        else{
                            this._linkProd(
                                'commandes',comid,r.insertId,cb
                            )
                        }
                    }
                )
            }
        },
        {
            name:'_getCatProds',cb:function (catid,cb){
                const req = this.__selectFrom(`${TeeData._n_t().articles_categories.name} INNER JOIN ${TeeData._n_t().articles.name} ON ${TeeData._n_t().articles.name}.id`,['*'],[['categorieid',`${TeeData._n_t().articles_categories.name}.articleid`],[`${catid}`,`${TeeData._n_t().articles.name}.id`]])
                
                this._db().query(
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>{return this.processRawData(elem,'CatArticle')}
                        )
                        if(cb)cb(e,r)
                    }
                )
            }
        },
        {
            name:'_getCats',cb:function (cb){
                const req = this.__selectFrom(TeeData._n_t().categories.name,['*'])
                this._db().query(
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>{return this.processRawData(elem,'Categorie')}
                        )
                        if(cb)cb(e,r)
                    }
                )
            }
        },
        {
            name:'_getCat'
            ,cb:function (id,cb){
                const req = this.__selectFrom(TeeData.knownTables.categories.name,['*'],[['nom'],[`${id}`]])
                this._db().query(
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>{return this.processRawData(elem,'Categorie')}
                        )
                        if(cb)cb(e,r)
                    }
                )
            }
        },
        {
            name:'_getCatByName'
            ,cb:function (name,cb){
                const req = this.__selectFrom(TeeData.knownTables.categories.name,['*'],[['nom'],[`'${name}'`]])
                this._db().query(
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>{return this.processRawData(elem,'Categorie')}
                        )
                        if(cb)cb(e,r)
                    }
                )
            }
        },
        {
            name:'_addCat'
            ,cb:function ({nom,illu},cb){
                const req = this.__insertINTO(TeeData.knownTables.categories.name,['nom','illu'],[`'${nom}'`,`'${illu}'`])
                
                this._db().query(
                    req,cb
                )
            }
        },
        {
            name:'_getClis',cb:function (cb){
                const req = this.__selectFrom(TeeData._n_t().clients.name,['*'])
                this._db().query(
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>{return this.processUserData(elem)}
                        )
                        if(cb)cb(e,r)
                    }
                )
            }
        },
        {
            name:'_getCli',cb:function (id,cb){
                const req = this.__selectFrom(TeeData._n_t().clients.name,['*'],[['id'],[id]])
                this._db().query(
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>{return this.processUserData(elem)}
                        )
                        if(cb)cb(e,r)
                    }
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
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>{return this.processUserData(elem)}
                        )
                        if(cb)cb(e,r)
                    }
                )
            }
        },
        {
            name:'_getComs',cb:function (cb){
                const req = this.__selectFrom(TeeData._n_t().commandes.name,['*'])
                this._db().query(
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>{return this.processRawData(elem,'Cart')}
                        )
                        if(cb)cb(e,r)
                    }
                )
            }
        },
        {
            name:'_getCom',cb:function (id,cb){
                const req = this.__selectFrom(TeeData._n_t().commandes.name,['*'],[['id'],[id]])
                this._db().query(
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>{return this.processRawData(elem,'Cart')}
                        )[0]
                        if(cb)cb(e,r)
                    }
                )
            }
        },
        {
            name:'_getComProds',cb:function (catid,cb){
                const req = this.__selectFrom(`${TeeData._n_t().articles_commandes.name} INNER JOIN ${TeeData._n_t().articles.name} ON ${TeeData._n_t().articles.name}.id`,['*'],[['commandeid',`${TeeData._n_t().articles_commandes.name}.articleid`],[`${catid}`,`${TeeData._n_t().articles.name}.id`]])
                
                this._db().query(
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>{return this.processRawData(elem,'ComArticle')}
                        )
                        if(cb)cb(e,r)
                    }
                )
            }
        },
        {
            name:'_getSpecificCom',cb:function (conds,cb){
                const req = this.__selectFrom(TeeData._n_t().commandes.name,['*'],conds)
                this._db().query(
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>{return this.processRawData(elem,'Cart')}
                        )
                        if(cb)cb(e,r)
                    }
                )
            }
        },
        {
            name:'_addCom'
            ,cb:function ({userid},cb){
                const req = this.__insertINTO(TeeData.knownTables.commandes.name,['userid'],[`${userid}`])
                
                this._db().query(
                    req,(e,r)=>{
                        if(e){
                            console.log(e)
                            cb(r)
                        }else{
                            this._getCom(r.insertId,cb)
                        }
                    }
                )
            }
        },
        {
            name:'_getAdms',cb:function (cb){
                const req = this.__selectFrom(TeeData._n_t().admins.name,['*'])
                this._db().query(
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>{return this.processUserData(elem,true)}
                        )
                        if(cb)cb(e,r)
                    }
                )
            }
        },
        {
            name:'_getAdm',cb:function (id,cb){
                const req = this.__selectFrom(TeeData._n_t().admins.name,['*'],[['id'],[id]])
                this._db().query(
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>{return this.processUserData(elem,true)}
                        )
                        if(cb)cb(e,r)
                    }
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
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>{return this.processUserData(elem,true)}
                        )
                        if(cb)cb(e,r)
                    }
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
        const usertype = this.shop.core.getObject(`TeeShop${admin?'Admin':'Client'}`)
        return usertype ? new usertype.class({db:this},userdata) : userdata

    }
    
    processRawData(data,type){
        type = this.shop.core.getObject(`TeeShop${type}`)
        return type ? new type.class({db:this},data) : data

    }
    _n_t(){
        return TeeData._n_t()
    }
    initialize(cb){
        this.configureActions(...TeeShopData.actions)
        if(cb)cb()
    }


    constructor(shop,creds={},tables=[]){
    
        super(creds,tables.length?tables:TeeData._tables()?TeeData._tables():[])
        Object.assign(this, new TeeShopObject({},{}))

        this.shop = shop
        this._setUsersTable(TeeData._n_t().clients.name)
        this._setAdminsTable(TeeData._n_t().admins.name)
        
        this._setUsersLogField("username")
        this._setUsersPasswField("password")
        
        this._setAdminsLogField("username")
        this._setAdminsPasswField("password")
        

        this.initialize(()=>{
            console.log('implemented custom DeeBee actions')
        })

    }
}

module.exports = TeeShopData
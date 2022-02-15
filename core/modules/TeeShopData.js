
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
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>this.processUserData(elem)
                        )
                        cb(e,r)
                    }
                )
            }
        },{
            name:'__admCreds',cb:function ({user,pass},cb){
                const req = this.__selectFrom(TeeData._n_t().admins.name,['*'],[[this._getAdminsLogField(),this._getAdminsPasswField()],[`'${user}'`,`MD5('${pass}')`]])
                this._db().query(
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>this.processUserData(elem,admin)
                        )
                        cb(e,r)
                    }
                )
            }
        },{
            name:'_getProds',cb:function (cb){
                const req = this.__selectFrom(TeeData._n_t().articles.name,['*'])
                this._db().query(
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>this.processRawData(elem,'Article')
                        )
                        cb(e,r)
                    }
                )
            }
        },
        {
            name:'_getProd'
            ,cb:function (id,cb){
                const req = this.__selectFrom(TeeData.knownTables.articles.name,['*'],[['nom'],[`${id}`]])
                this._db().query(
                    req,(e,r)=>{
                        if(r && r.length) r = r.map(
                            elem=>this.processRawData(elem,'Article')
                        )
                        cb(e,r)
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
                            elem=>this.processRawData(elem,'Article')
                        )
                        cb(e,r)
                    }
                )
            }
        },
        {
            name:'_addProd'
            ,cb:function ({nom,prix},cb){
                const req = this.__insertINTO(TeeData.knownTables.articles.name,['nom','prix'],[`'${nom}'`,`'${prix}'`])
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
            name:'_addCatProd'
            ,cb:function (catid,{nom,prix},cb){
                this._addProd(
                    {nom,prix},(e,r)=>{
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
            ,cb:function (catid,{nom,prix},cb){
                this._addProd(
                    {nom,prix},(e,r)=>{
                        if(e)cb(e,r)
                        else{
                            this._linkProd(
                                'commandes',catid,r.insertId,cb
                            )
                        }
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
                            elem=>this.processRawData(elem,'Categorie')
                        )
                        cb(e,r)
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
                            elem=>this.processRawData(elem,'Categorie')
                        )
                        cb(e,r)
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
                            elem=>this.processRawData(elem,'Categorie')
                        )
                        cb(e,r)
                    }
                )
            }
        },
        {
            name:'_addCat'
            ,cb:function ({nom},cb){
                const req = this.__insertINTO(TeeData.knownTables.categories.name,['nom'],[`'${nom}'`])
                
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
                            elem=>this.processUserData(elem)
                        )
                        cb(e,r)
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
                            elem=>this.processUserData(elem)
                        )
                        cb(e,r)
                    }
                )
            }
        },
        {
            name:'_addCli'
            ,cb:function ({nom,prenom,username,adresse,telephone,mail,password},cb){
                const req = this.__insertINTO(TeeData.knownTables.clients.name,['nom','prenom','username','adresse','telephone','mail','password'],[`''${nom}''`,`'${prenom}'`,`'${username}'`,`'${adresse}'`,`'${telephone}'`,`'${mail}'`,`MD5('${password}')`])
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
                            elem=>this.processUserData(elem)
                        )
                        cb(e,r)
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
                            elem=>this.processRawData(elem,'Cart')
                        )
                        cb(e,r)
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
                            elem=>this.processRawData(elem,'Cart')
                        )
                        cb(e,r)
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
                            elem=>this.processRawData(elem,'Cart')
                        )
                        cb(e,r)
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
                            elem=>this.processUserData(elem,true)
                        )
                        cb(e,r)
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
                            elem=>this.processUserData(elem,true)
                        )
                        cb(e,r)
                    }
                )
            }
        },
        {
            name:'_addAdm'
            ,cb:function ({nom,prenom,username,adresse,telephone,mail,password},cb){
                const req = this.__insertINTO(TeeData.knownTables.admins.name,['nom','prenom','username','adresse','telephone','mail','password'],[`''${nom}''`,`'${prenom}'`,`'${username}'`,`'${adresse}'`,`'${telephone}'`,`'${mail}'`,`MD5('${password}')`])
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
                            elem=>this.processUserData(elem,true)
                        )
                        cb(e,r)
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
        const usertype = this.shop.core.getObject(`TeeShop${admin?'Admin':'User'}`)
        return usertype ? new usertype.class({db:this},userdata) : userdata

    }
    
    processRawData(data,type){
        type = this.shop.core.getObject(`TeeShop${type}`)
        return type ? new type.class({db:this},data) : data

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
        this._setUsersPasswField("password")
        
        this._setAdminsLogField("username")
        this._setAdminsPasswField("password")
        

        this.initialize(()=>{
            console.log('implemented custom DeeBee actions')
        })

    }
}

module.exports = TeeShopData
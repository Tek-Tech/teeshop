const fs = require('fs')
const path = require('path')
const {Ear} = require("@tek-tech/ears")

String.prototype.capitalizeFirst = function(){
    return this.charAt(0).toUpperCase() + this.slice(1);
}
class TeeShop extends Ear{

    //CONF

    data = {}
    static defaultconf = {corepath:path.join(__dirname,'core'),classespath:path.join(__dirname,'core','classes'),modulespath:path.join(__dirname,'core','modules'),objectspath:path.join(__dirname,'core','objects')}
    static defaultcreds = {host:'127.0.0.1',user:'root',password:'',database:'teeshop'}
    static _d_conf(){
        return this.defaultconf
    }
    static _d_creds(){
        return this.defaultcreds
    }
    static _sd_conf(conf){
        return this.defaultconf = conf ? conf : this._d_conf() 
    }
    static _sd_creds(creds){
        return this.defaultcreds = creds ? creds : this._d_creds()
    }
    whenDatabaseReady(action){
        this.database.whenReady(
            action
        )
    }
    cliClass(){
        return fs.readFileSync(path.join(__dirname,'TeeShopCli.js'))
    }
    checkIfReady(){
        if(this.coreready&&this.dbready) this.ready = 1
    }
    init(dbcreds,cb){
        this.dc = dbcreds
        this.whenReady(
            ()=>{
                console.log("TeeShop Is Ready")
                this.setData(cb)
            }
        )
        this.runConfigActions()
    }
    defaultCli(cb){
        let clis = []
        this.database._addCli(
            {
                nom:'client',
                prenom:'client',
                username:'client',
                adresse:'client',
                telephone:'client',
                mail:'client@client.com',
                password:'teeteetee'
            },(e,r)=>{
                if(r&&r.hasOwnProperty('insertId')){
                    this.database._getCli(
                        r.insertId,cb
                    )
                }else{
                    console.log(e)
                    console.log(r)
                    this.data.clients = clis
                    cb(e,clis)
                }
            }
        )
    }
    defaultAdmin(cb){
        let adms = []
        this.database._addAdm(
            {
                nom:'admin',
                prenom:'admin',
                username:'admin',
                adresse:'admin',
                telephone:'admin',
                mail:'admin@admin.com',
                password:'teeteetee'
            },(e,r)=>{
                if(r&&r.hasOwnProperty('insertId')){
                    this.database._getAdm(
                        r.insertId,cb
                    )
                }else{
                    console.log(e)
                    console.log(r)
                    this.data.admins = adms
                    cb(e,adms)
                }
            }
        )
    }






    //ACTION



    _new_categorie(nom,cb){
        // console.log(this.getData(

        //     'categories'

        // ))
        this.getData(

            'categories'

        )   ?   
                this.getData(
                    'categories'
                )._new(nom,cb)
            
            :   cb(

                null
            )
    
    }
    
    _new_article_categorie(catid,nom,prix,cb){
        // console.log(this.getData(

        //     'categories'

        // ))
        this.getData(

            'categories'

        )   ?   
                this.getCategorie(
                    catid,(cat=>{
                        if(!cat) cb(null)
                        else(
                            cat.addArticle(
                                {nom,prix}
                                ,(e,r)=>{
                                    if(e)console.log(e)
                                    cb(r)
                                }
                            )
                        )
                    })
                )
            
            :   cb(

                null
            )
    
    }
    

    _new_commande(userid,cb){
        // console.log(this.getData(

        //     'commandes'

        // ))
        this.getData(

            'commandes'

        )   ?   
                this.getData(
                    'commandes'
                )._new(userid,cb)
            
            :   cb(

                null
            )
    
    }





    //DATA


    getAdmin(id,cb){
        this.admins(
            (e,admins)=>{
                let found = null
                admins.forEach(
                    admin=>{
                        if(admin.id == id) found = admin._data
                    }
                )
                cb(found)
            }
        )
    }

    getData(data){
        return (this.data.hasOwnProperty(data)?this.data[data]:null)
    }
    clients(cb){
        this.database._getClis(
            (e,clis)=>{
                if(!clis.length){
                    this.defaultCli(
                        (e,r)=>{
                            if(r.length){
                                clis.push(r[0])
                            }
                            this.data.clients = clis
                            cb(e,clis)
                        }
                    )
                }else{
                    this.data.clients = clis?clis:[]
                    cb(e,clis)
                }
            }
        )
    }
    admins(cb){
        this.database._getAdms(
            (e,adms)=>{
                if(!adms.length){
                    this.defaultAdmin(
                        (e,r)=>{
                            if(r.length){
                                adms.push(r[0])
                            }
                            this.data.admins = adms
                            cb(e,adms)

                        }
                    )
                }else{
                    this.data.admins = adms
                    cb(e,adms)
                }
            }
        )
    }
    articles(cb){
        this.database._getProds(
            (e,prods)=>{
                this.data.articles = prods
                cb(e,prods)
            }
        )
    }
    commandes(cb){
        this.database._getComs(
            (e,coms)=>{
                this.data.commandes = new (require(path.join(this.getObjectsPath(),'TeeComManager')))({shop:this,db:this.database},{commandes:coms})
                cb(e,coms)
            }
        )
    }
    getCommandes(cb){
        this.commandes(
            ()=>{
                cb(this.data.commandes)
            }
        )
    }
    getCommande(id,cb,userid){
        this.data.commandes.getCommande(
            id,userid,commande=>{
                commande?commande.setData(
                    cb
                ):cb(commande)
            }
        )
    }
    categories(cb){
        this.database._getCats(
            (e,cats)=>{
                this.data.categories = new (require(path.join(this.getObjectsPath(),'TeeCatManager')))({shop:this,db:this.database},{categories:cats})
                cb(e,this.data.categories)
            }
        )
    }
    getCategories(cb){
        this.categories(
            ()=>{
                cb(this.data.categories)
            }
        )
    }
    getCategorie(id,cb,name){
        this.data.categories.getCategorie(
            id,name,cb
        )
    }
    getArticleCategorie(catid,artid,cb,catname,name){
        this.getCategorie(
            catid,catname,(category)=>{
                category.getArticle(
                    artid,cb,name
                )
            }
        )
    }
    getArticleCommande(catid,artid,cb,catname,name){
        this.categories(
            ()=>{
                let found = null
                this.data.categories.forEach(
                    cat=>{
                        if(cat.getData(catname?'name':'id') == catname?catname:catid) found = cat
                    }
                )
                if(!found)cb(found)
                let art = null
                found.getData('articles').forEach(
                    article=>{
                        if(article.getArticle().getData(name?'name':'id')==name?name:artid) art = article
                    }
                )
                cb(art)
            }
        )
    }
    setData(cb){
        const admins = cb =>{
            this.admins( 
                (e,r)=>clients(cb)
            )
        }
        const clients = cb =>{
            this.clients(
                (e,r)=>categories(cb)
            )
        }
        const commandes = cb =>{
            this.commandes(
                (e,r)=>cb(this)
            )
        }
        const categories = cb =>{
            this.categories(
                (e,r)=>articles(cb)
            )
        }
        const articles = cb =>{
            this.articles(
                (e,r)=>commandes(cb)
            )
        }
        admins(cb)

    }
    logCli(user,pass,cb){

        this.database.__cliCreds(
            {user,pass},(e,r)=>{
                console.log(e)
                cb(r&&r.length?r[0]._data:null)
            }
        )


    }
    logAdm(user,pass,cb){

        this.database.__admCreds(
            {user,pass},(e,r)=>{
                cb(r&&r.length?r[0]._data:null)
            }
        )


    }
    loguser(user,pass,cb,type='cli'){
        this[`log${type=='admin'||type=='adm'?'Adm':'Cli'}`](user,pass,user=>{
            cb(user)
        })
    }
    runConfigActions(){
        if(this.configuredClassespath()) this.assignClasses()
        if(this.configuredCorepath()) this.assignCore()
    }
    assignCore(){
        const Core = require(path.join(this.getCorePath(),"core"))
        this.core = new Core(this.getClasses(),this.database,this.getClassesPath(),this.getModulesPath(),this,TeeShop)
        this.core.whenReady(
            ()=>{
                this.coreready = 1
                if(this.core.modules.hasOwnProperty('teeshopdata')){
                    this.database = this.core.modules.teeshopdata.module
                    if(this.database.ready){
                        this.dbready = 1 
                    }else{
                        this.whenDatabaseReady(
                            ()=>{
                                this.dbready = 1 
                                console.log("database ready")
                                this.checkIfReady()
                            }
                        )
                    }
                }
                console.log("core ready")
                this.checkIfReady()
            }
        )
    }
    assignClasses(){
        let classespath = this.getClassesPath()
        let classes = fs.readdirSync(classespath).map(elem=>{return [elem.replace(".js",""),elem]})
        classes.forEach(
            classelem=>{
                this.classes[classelem[0]]=classelem[1]
            }
        )
    }
    getClasses(){
        return this.classes
    }
    getClassesPath(){
        return this.config.classespath
    }
    getModulesPath(){
        return this.config.modulespath
    }
    getObjectsPath(){
        return this.config.objectspath
    }
    getCorePath(){
        return this.config.corepath
    }
    configuredCorepath(){
        return this.config.hasOwnProperty('corepath')
    }
    configuredClassespath(){
        return this.config.hasOwnProperty('classespath')
    }
    configuredObjectspath(){
        return this.config.hasOwnProperty('objectspath')
    }
    configuredModulespath(){
        return this.config.hasOwnProperty('modulespath')
    }
    assignConfig(configname,configvalue){
        this.config[configname] = configvalue
    }
    setConfig(config){
        Object.keys(config).forEach(
            configname=>this.assignConfig(configname,config[configname])
        )
    }
    getConfig(configname){
        return (this.config.hasOwnProperty(configname)) ? this.config[configname] : null
    }
    constructor(config,dbcreds,cb){
        super()
        this.config = {}
        this.classes = {}
        this.setConfig(config)
        this.init(dbcreds,cb)
    }
}

module.exports = TeeShop
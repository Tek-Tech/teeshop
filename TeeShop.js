const fs = require('fs')
const path = require('path')
const {Ear} = require("@tek-tech/ears")

class TeeShop extends Ear{
    data = {}
    static defaultconf = {corepath:path.join(__dirname,'core'),classespath:path.join(__dirname,'core','classes'),modulespath:path.join(__dirname,'core','modules')}
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
    clients(cb){
        this.database._getClis(
            (e,clis)=>{
                if(!clis.length){
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
                                    r.insertId,(e,r)=>{
                                        if(r.length){
                                            clis.push(r[0])
                                        }
                                        this.data.clients = clis
                                        cb(e,clis)
                                    }
                                )
                            }else{
                                console.log(e)
                                console.log(r)
                                this.data.clients = clis
                                cb(e,clis)
                            }
                        }
                    )
                }else{
                    this.data.clients = clis?clis:[]
                    cb(e,clis)
                }
            }
        )
    }
    articles(cb){
        this.database._getProds(
            (e,prods)=>{
                this.data.articles = prods
                if(cb)cb(e,prods)
            }
        )
    }
    commandes(cb){
        this.database._getComs(
            (e,coms)=>{
                this.data.commandes = coms
                if(cb)cb(e,coms)
            }
        )
    }
    categories(cb){
        this.database._getCats(
            (e,cats)=>{
                this.data.categories = cats
                if(cb)cb(e,cats)
            }
        )
    }
    admins(cb){
        this.database._getAdms(
            (e,adms)=>{
                if(!adms.length){
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
                                    r.insertId,(e,r)=>{
                                        if(r.length){
                                            adms.push(r[0])
                                        }
                                        this.data.admins = adms
                                        cb(e,adms)
                                    }
                                )
                            }else{
                                console.log(e)
                                console.log(r)
                                this.data.admins = adms
                                cb(e,adms)
                            }
                        }
                    )
                }else{
                    this.data.admins = adms
                    cb(e,adms)
                }
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
                cb(r&&r.length?r[0]:null)
            }
        )


    }
    logAdm(user,pass,cb){

        this.database.__admCreds(
            {user,pass},(e,r)=>{
                cb(r&&r.length?r[0]:null)
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
    getCorePath(){
        return this.config.corepath
    }
    configuredCorepath(){
        return this.config.hasOwnProperty('corepath')
    }
    configuredClassespath(){
        return this.config.hasOwnProperty('classespath')
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
    constructor(config,dbcreds,cb){
        super()
        this.config = {}
        this.classes = {}
        this.setConfig(config)
        this.init(dbcreds,cb)
    }
}

module.exports = TeeShop
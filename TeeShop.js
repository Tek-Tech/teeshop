const fs = require('fs')
const path = require('path')
const DeeBee = require("@tek-tech/deebee")
const {Ear} = require("@tek-tech/ears")

class TeeShop extends Ear{
    static defaultconf = {corepath:path.join(__dirname,'core'),classespath:path.join(__dirname,'core','classes'),modulespath:path.join(__dirname,'core','modules')}
    static defaultcreds = {host:'127.0.0.1',user:'root',password:'',database:'test'}
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
    tables = {
        customers : "_customers",
        categories : "_categories",
        commands : "_commands",
        articles : "_articles",
        admins : "_admins"
    }
    initDeeBee(dbcreds={}){
        this.database = new DeeBee(dbcreds);
        this.whenDatabaseReady(
            ()=>{
                this.dbready = 1 
                console.log("database ready")
                this.checkIfReady()
            }
        )
    }
    whenDatabaseReady(action){
        this.database.whenReady(
            action
        )
    }
    checkIfReady(){
        if(this.coreready&&this.dbready) this.ready = 1
    }
    init(dbcreds){
        this.whenReady(
            ()=>{
                console.log("i am ready")
            }
        )
        // this.initDeeBee(dbcreds)
        this.runConfigActions()
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
    constructor(config,dbcreds){
        super()
        this.config = {}
        this.classes = {}
        this.setConfig(config)
        this.init(dbcreds)
    }
}

module.exports = TeeShop
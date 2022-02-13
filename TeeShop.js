const fs = require('fs')
const path = require('path')
const DeeBee = require("@tek-tech/deebee")
const {Ear} = require("@tek-tech/ears")

class TeeShop extends Ear{


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
        this.initDeeBee(dbcreds)
        this.runConfigActions()
    }
    runConfigActions(){
        if(this.configuredClassespath()) this.assignClasses()
        if(this.configuredCorepath()) this.assignCore()
    }
    assignCore(){
        this.core = new (require(path.join(this.getCorePath(),"core")))(this.getClasses())
        this.core.whenReady(
            ()=>{
                this.coreready = 1
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
    getCorePath(){
        return this.config.corepath
    }
    configuredCorepath(){
        return this.config.hasOwnProperty('corepath')
    }
    configuredClassespath(){
        return this.config.hasOwnProperty('corepath')
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

let tshop = new TeeShop({corepath:path.join(__dirname,'core'),classespath:path.join(__dirname,'core','classes')},dbcreds={host:'127.0.0.1',user:'root',database:'tek_tech',password:''})
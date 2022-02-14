
const path = require('path')
const fs = require('fs')
const { Ear } = require("@tek-tech/ears")
const { type } = require('os')
const TeeShopData = require('./modules/TeeShopData')

module.exports = class extends Ear {

    init(objects){
        Object.keys(objects).forEach(
            objectname=>{
                const Class = require(path.join(this.classespath,objects[objectname]))
                this.objects[objectname] = {
                    class:Class
                    ,create:(...args)=>{
                        if(args.length>1){
                            if((typeof args[1]) == Object){
                                args[1].db = this.data
                            }
                        }else{
                           if(args.length) args.push({db:this.data}) 
                           else{
                               args = [{},{db:this.data}]
                           } 
                        }
                        return new Class (...args)
                    }
                }
            }
        )
        this.assignModules(
            ()=>{
                
                if(this.modules.hasOwnProperty('teeshopdata')){
                    this.database = this.modules.teeshopdata.module
                    this.whenDatabaseReady(
                        ()=>{
                            this.ready = 1
                        }
                    )
                }else{
                    // console.log(this.modules)
                }
            }
        )
    }

    hasObject(objectname){
        return this.objects.hasOwnProperty(objectname)
    }

    getObject(objectname){
        return this.hasObject(objectname) ? this.objects[objectname] : null
    }

    instanciateNew(objectname,...args){
        let object = this.getObject(objectname)
        if(object){
            let name = object.name
            object = object.create(...args)  
            this.instanciated.push([name,object])
        }
        return object
    }
    assignModule(mod){
        if(mod){
            let args = []
            const name = mod.split('.js')[0].toLowerCase()
            const modpath = path.join(this.modulespath,mod)
            const conf = this.shoptype._d_conf() 
            const creds = this.shoptype._d_creds()
            if(name == 'teeshopdata') args = [creds]
            const Mod  = new (require(modpath))(...args)
            this.modules[name] = {
                name,path:modpath,module:Mod
            }
        }
    }
    whenDatabaseReady(action){
        this.database.whenReady(
            action
        )
    }
    assignModules(cb){
        const modules = fs.readdirSync(this.modulespath)
        modules.forEach(
            mod=>{
                this.assignModule(mod)
            }
        )
        console.log('we got ',Object.keys(this.modules).length,' module',Object.keys(this.modules).length<=1?'':'s',' \n',/*this.modules*/)
        if(cb)cb()
    }

    constructor(objects,data,classespath,modulespath,shop,shoptype){
        super()
        this.shop = shop
        this.shoptype = shoptype
        this.instanciated = []
        this.classespath=classespath
        this.modulespath=modulespath
        this.data = data
        this.ready = null
        this.objects = {}
        this.modules = {}
        this.init(objects)
    }

}
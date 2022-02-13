
const path = require('path')
const { Ear } = require("@tek-tech/ears")
const { type } = require('os')

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
        this.ready =1
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

    constructor(objects,data,classespath){
        super()
        this.instanciated = []
        this.classespath=classespath
        this.data = data
        this.ready = null
        this.objects = {}
        this.init(objects)
    }

}
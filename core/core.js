const { Ear } = require("@tek-tech/ears")

module.exports = class extends Ear {

    init(objects){
        Object.keys(objects).forEach(
            objectname=>{
                this.objects[objectname] = objects[objectname]
            }
        )
        this.ready =1
    }


    constructor(objects){
        super()
        this.ready = null
        this.objects = {}
        this.init(objects)
    }

}
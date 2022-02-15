const { Ear } = require("@tek-tech/ears")

class TeeShopObject extends Ear{
    configure(config){
        Object.keys(config).forEach(
            confname=>{
                this.config[confname] = config[confname]
            }
        )
    }

    assignData(){
        Object.keys(this.rawdata).forEach(
            dataname=>{
                this[dataname] = this.rawdata[data]
            }
        )
    }

    isReady(){
        return this.ready
    }

    _type(){
        return typeof this
    }

    constructor(config,data){
        super()
        this.config = {}
        this.rawdata = data
        this.configure(config)
    }
}
module.exports = TeeShopObject
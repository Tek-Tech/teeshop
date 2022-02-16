const { Ear } = require("@tek-tech/ears")

class TeeShopObject extends Ear{


    whenGotDeeBee(cb){
        if(!this.gotDeeBee()){
            this.when(
                'gotdeebee',cb
            )
            return
        }
        cb(this.database)
    }

    gotDeeBee(){
        return this.hasOwnProperty('database')
    }

    waitForDeeBee(){
        this.waitdbinterval = setInterval(
            ()=>{
                if(this.config.hasOwnProperty('db')){
                    this.database = this.config.db
                    this.trigger('gotdeebee','ok')
                    this.stopWaitingForDeeBee()
                }
            },1000
        )
    }
    stopWaitingForDeeBee(){
        clearInterval(this.waitdbinterval)
    }


    getData(name){
        return this.hasOwnProperty('_data') ? this._data.hasOwnProperty(`${name}`) ? this._data[name] : null : null
    }


    getConfig(name){
        return this.hasOwnProperty('config') ? this.config.hasOwnProperty(`${name}`) ? this.config[name] : null : null
    }
    
    assignData(){
        this._data = this.hasOwnProperty('_data') ? this._data : {} 
        Object.keys(this.rawdata).forEach(
            key=>{
                this._data[key] = this.rawdata[key]
            }
        )
        Object.keys(this.rawdata).forEach(
            dataname=>{
                this[dataname] = this.rawdata[dataname]
            }
        )
    }

    configure(config){
        Object.keys(config).forEach(
            confname=>{
                this.config[confname] = config[confname]
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
        this.assignData()
    }
}
module.exports = TeeShopObject
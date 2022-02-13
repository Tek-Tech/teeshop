class TeeShopObject{
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

    _type(){
        return typeof this
    }

    constructor(config,data){
        this.config = {}
        this.rawdata = data
        this.configure(config)
    }
}
module.exports = TeeShopObject
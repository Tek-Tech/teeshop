if((typeof module)!='undefined'){
    var path = require('path')
    var TeeShopUser = require(path.join(__dirname,"TeeShopUser"))
}
class TeeShopClient extends TeeShopUser{

    whenGotData(cb){
        if(this.gotData()){
            this.getData(cb)
        }else{
            this.when(
                'gotdata',cb
            )
        }
    }

    whenGotDeeBee(cb){
        if(this.gotDeeBee()){
            cb(this.database)
        }else{
            this.when(
                'gotdeebee',cb
            )
        }
    }


    _commandes(cb){

        this.database.commandes(
            ({userid:this.getId()}),(e,commandes)=>{
                if(e)console.log(e)

                this.rawdata.commandes = commandes 
                this.commandes = commandes ? commandes : this.commandes
                if(cb)cb(commandes)
            }
        )

    }

    getData(cb){
        if(this.gotData()){
            cb(this.rawdata)
        }else{
            this.whenGotData(
                cb
            )
        }
    }

    setData(cb){
        this.whenGotDeeBee(
            ()=>{
                this._commandes(
                    commandes=>{
                        this.rawdata.commandes = commandes 
                        this.commandes = commandes ? commandes : this.commandes
                        if(cb)cb(commandes)
                        this.gotdata =  1
                        this.trigger('gotdata',this.rawdata)
                        if(cb)cb(this.rawdata)
                    }
                )
            }
        )

    }


    assignData(data){
        if(data){
            Object.keys(data).forEach(key=>{
                this[key]=data[key]
            })
        }
    }

    gotData(){
        return this.gotdata
    }

    initDeeBee(cb){
        const checkDeeBee = ()=>{
            if(this.config.db){
                this.database = this.config.db
                this.database._____registerAction(
                    'commandes',function({userid},cb){
                        const req = this.__selectFrom(
                            `${this._n_t().commandes.name} INNER JOIN ${this._n_t().articles_commandes.name} INNER JOIN ${this._n_t().articles.name} ON ${this._n_t().articles.name}.id ON ${this._n_t().articles_commandes.name}.commandeid `,['*'],[['userid',`${this._n_t().articles_commandes.name}.commandeid`,`${this._n_t().articles.name}.id`],[userid,`${this._n_t().commandes.name}.id`,`${this._n_t().articles_commandes.name}.articleid`]]
                        )
                        this.db.query(
                            req,(e,commandes)=>{
                                if(e)console.log(e)
                                else{
                                    commandes = commandes   ?   commandes.map(
                                        elem=>{
                                            return elem
                                        }
                                    )   : []
                                }
                                if(cb)cb(e,commandes)
                            }
                        )
                    }
                )
                this.trigger('gotdeebee')
                this.gotdeebee = true
            }else{
                setTimeout(()=>{checkDeeBee()},1500)
            }
        }
        checkDeeBee()
    }

    init(){
        this.setData(
            ()=>{
                this.setReady()
            }
        )
    }

    getId(){
        return this.rawdata.id
    }

    constructor(config,data){
        super(config,data)
        this.gotdata = false
        this.gotdeebee = false
        this.commandes = []
        this.assignData(data)
        this.initDeeBee()
        this.init()
    }

}

module.exports = TeeShopClient
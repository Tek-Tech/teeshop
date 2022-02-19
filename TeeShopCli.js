class TeeShopCli extends Ear{


    data = {
        categories : []
        ,articles  : []
        ,commandes : []
    }

    getData(cb){


        this.askCategories(
            (cats)=>{
                this.data.categories = cats
                this.setReady()
                if(cb)cb()
            }
        )

    
    }


    askArticles(cb){
        this.sio.whenUuidentified(
            ()=>{
                this.sio.post(
                    'articles',{},(arts)=>{
                        this.data.articles = arts
                        if(cb)cb(arts)
                    }
                )
            }
        )
    }

    askCategories(cb){
        this.sio.whenUuidentified(
            ()=>{
                this.sio.post(
                    'categories',{},(cats)=>{
                        this.data.categories = cats
                        if(cb)cb(cats)
                    }
                )
            }
        )
    }

    init(){
        this.sio.whenUuidentified(
            ()=>{

                this.getData(
                    ()=>{
                        this.setReady()
                    }
                )

            }
        )
    }

    constructor(){
        super()
        console.log("RUNNING TSHOP...")
        console.log("Auteur: EL HADJI SEYBATOU MBENGUE (TEK-TECH)")
        console.log('http://tektech.rf.gd')
        this.sio = new PageSocket()
        this.init()
        this.whenReady(
            ()=>{
                console.log("TEESHOP INITIALISED")
            }
        )
    }


}
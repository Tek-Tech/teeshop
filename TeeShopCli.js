class TeeShopCli extends Ears{


    data = {
        categories = []
        ,articles  = []
        ,commandes = []
    }

    getData(cb){


        this.askCategories(
            (cats)=>{
                this.data.categories = cats
                this.askArticles(
                    (arts)=>{
                        this.data.articles = arts
                        if(cb)cb()
                    }
                )
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
        this.sio = new PageSocket()
        this.init()
    }


}
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
                if(currentpage == 'admin') this.hasOwnProperty('refreshTabView') ? this.refreshTabView() : null
                if(cb)cb()
            }
        )

    
    }
    
    renderCategorieArticle(article){
        return `
            <li id='${article.id}' class='article'>
                ${article.nom}
            </li>
        `
    }

    renderCategorieArticles(cat){
        return `
            <ul class='categorie'>
                <h1>
                    ${cat.nom}
                </h1>
                ${cat.articles.map(
                    article=>{
                        return this.renderCategorieArticle(article)
                    }
                ).join('\n')}
            </ul>
        `
    }

    getArticles(cb){
        return this.askArticles(cb)
    }

    getCategories(cb){
        return this.askCategories(cb)
    }

    getCommandes(){
        return this.data.commandes
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
                        if(this.isAdmin()){
                            if((typeof Cman)!='undefined' && Cman.cooks()['teeId']){
                                this.sio.whenTeeIdentified(
                                    ()=>{
                                        this.sio.post(
                                            'admdata',this.sio.getTeeId(),({e,r})=>{
                                                if(e)alert(e)
                                                else{
                                                    
                                                    this.adm = r
                                                    this.gotadmdata = true 
                                                    this.setReady()
                                                
                                                }
                                            }
                                        )
                                    }
                                )
                            }else{
                                this.setReady()
                            }
                        }else{
                            this.setReady()
                        }
                    }
                )

            }
        )
    }

    isAdmin(){
        return this.isadmin
    }

    constructor(isAdmin = false){
        super()
        console.log("RUNNING TSHOP...")
        console.log("Auteur: EL HADJI SEYBATOU MBENGUE (TEK-TECH)")
        console.log('http://tektech.rf.gd')
        this.isadmin = isAdmin
        this.sio = new PageSocket()
        this.init()
        this.whenReady(
            ()=>{
                console.log("TEESHOP INITIALISED")
            }
        )
    }


}
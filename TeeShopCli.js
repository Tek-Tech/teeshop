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

        this.askCommands(
            (commands)=>{
                alert('got commands')
                console.log(commands)
            }
        )
    
    }
    
    renderCategorieArticle(article){
        return `
            <li id='${article.id}' class='article'>
                <img src='/illuprods/${article.illu}'>
                <span>${article.nom}</span>
            </li>
        `
    }

    renderCategorieArticles(cat){
        return `
            <ul class='categorie'>
                <h1>
                    ${cat.nom}
                </h1>
                <li>
                    <ul  class='articles'>
                        ${cat.articles.map(
                            article=>{
                                return this.renderCategorieArticle(article)
                            }
                        ).join('\n')}
                    </ul>
                </li>
            </ul>
        `
    }

    getArticles(cb){
        return this.askArticles(cb)
    }

    getCategories(cb){
        return this.askCategories(cb)
    }

    getCommandes(cb){
        return this.askCommands(cb)
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

    askCommands(cb){
        this.sio.whenUuidentified(
            ()=>{
                this.sio.post(
                    'commandes',{},(coms)=>{
                        this.data.commandes = coms
                        if(cb)cb(coms)
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
                            this.setCart()
                            this.whenGotCart(
                                cart=>{
                                    this.setReady()
                                }
                            )
         
                        }
                    }
                )

            }
        )
    }
    addCartProd(id,nom,quantite,prix){
        this.cart.articles.push({
            id,nom,quantite,prix
        })
        this.saveCart()
    }
    whenGotCart(cb){

        if(this.gotCart()){
            cb(this.getCart())
        }else{
            this.when(
                'gotcart',cb
            )
        }

    }


    gotCart(){
        return this.getCart() == true
    }


    setCart(cart=null){

        if(cart){
            this.cart = cart
            return
        }
        if((typeof Cman)!='undefined'){
            if(Cman.cooks().hasOwnProperty('cart')){
                this.cart = JSON.parse(Cman.cooks()['cart'])
                this.trigger('gotcart',this.cart)
    
            }else{
                this.saveCart()
                this.trigger('gotcart',this.cart)
            }

        }else{
            console.log((typeof Cman)!='undefined')
        }
    }


    saveCart(){

        if((typeof Cman)!='undefined' ){
        
            Cman.setCookie('cart',JSON.stringify(this.cart ? this.cart : {articles:[],client:{nom:null,prenom:null,telephone:null,adresse:null,mail:null}}))
            this.setCart(this.cart ? this.cart : {articles:[],client:{nom:null,prenom:null,telephone:null,adresse:null,mail:null}})
        
        }
    }

    getCart(){

        return this.cart

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
        this.cart = null
 
        this.init()
        this.whenReady(
            ()=>{
                console.log("TEESHOP INITIALISED")
            }
        )
    }


}
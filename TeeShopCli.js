class TeeShopCli extends Ear{


    data = {
        categories : []
        ,articles  : []
        ,commandes : []
    }

    getData(cb){
        const action = ()=>{
            this.setReady()
            if(currentpage == 'admin') this.hasOwnProperty('refreshTabView') ? this.refreshTabView() : null
            if(cb)cb()
        }
        this.askCategories(
            (cats)=>{
                this.data.categories = cats

                if(!this.isAdmin()){
                    action()
                    return
                }
                this.askCommands(
                    (commands)=>{
                        this.data.commandes = commands
                        if(!this.gotcform){
                            action()
                            return
                        }
                        this.askContactMsgs(
                            msgs=>{
                                this.data.messages = msgs
                                action()
                            }
                        )
                    }
                )
            }
        )

    
    }

    renderPanel(){
        return `
            <h1>Panel</h1>
            <section class='panel-block'>
                ${
                    this.renderCommandes()
                }
                ${
                    this.renderCategories()
                }
            </section>
        `
    }
    
    renderCategorieArticle(article){
        return `
            <li id='${article.id}' class='article'>
                <img src='/illuprods/${article.illu}'>
                <span>${article.nom}</span>
            </li>
        `
    }

    renderCategorie(cat){
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

    renderCategories(){
        return `
            <h1>Catégories</h1>
            <ul class='list' id='liste-categories'>
                ${
                    TeeShop.data.categories.map(
                        categorie=>{
                            return TeeShop.renderCategorie(
                                categorie
                            )
                        }
                    ).join('\n')
                }
            </ul>
        `
    }



    renderMessageUser(user){
        return `
            <ul class='user'>
                Références client
                <li>
                    <span>
                        Nom Complet :
                    </span>
                    <span>
                        ${user.prenom} ${user.nom}
                    </span>
                </li>
                <li>
                    <span>
                        Téléphone :
                    </span>
                    <span>
                        ${user.telephone}
                    </span>
                </li>
                <li>
                    <span>
                        Adresse E-mail :
                    </span>
                    <span>
                        ${user.mail}
                    </span>
                </li>
            </ul>
        `
    }


    renderMessageMessage(message){
        return `
            <li id='${message.id}' class='message'>
                <span>${message.message}</span>
            </li>
        `
    }

    renderMessage(message){
        
        return `
            <ul class='message'>
                <h1>
                    MESSAGE : TSM_${message.id}
                </h1>
                <li>
                    ${
                        this.renderMessageUser(message)
                    }
                </li>
                ${
                    this.renderMessageMessage(message)
                }
            </ul>
        `
    }

    renderContactMessages(){
        return `
            <h1>Messages</h1>
            <ul class='list' id='liste-messages'>
                ${
                    TeeShop.data.messages.map(
                        message=>{
                            return TeeShop.renderMessage(
                                message
                            )
                        }
                    ).join('\n')
                }
            </ul>
        `
    }

    renderCommandeUser(user){
        return `
            <ul class='user'>
                Références client
                <li>
                    <span>
                        Nom Complet :
                    </span>
                    <span>
                        ${user.prenom} ${user.nom}
                    </span>
                </li>
                <li>
                    <span>
                        Téléphone :
                    </span>
                    <span>
                        ${user.telephone}
                    </span>
                </li>
                <li>
                    <span>
                        Adresse E-mail :
                    </span>
                    <span>
                        ${user.mail}
                    </span>
                </li>
                <li>
                    <span>
                        Adresse Postale:
                    </span>
                    <span>
                        ${user.adresse}
                    </span>
                </li>
            </ul>
        `
    }

    renderCommandeArticle(article){
        return `
            <li id='${article.id}' class='article'>
                <img src='/illuprods/${article.illu}'>
                <span>${article.nom}</span>
            </li>
        `
    }


    renderCommandes(){
        return `
            <h1>Commandes</h1>
            <ul class='list' id='liste-commandes'>
                ${
                    this.data.commandes.map(
                        commande=>{
                            return TeeShop.renderCommande(
                                commande
                            )
                        }
                    ).join('\n')
                }
            </ul>
        `
    }

    renderCommande(com){
        return `
            <ul class='commande'>
                <h1>
                    COMMANDE : TSC_${com.id}
                </h1>
                <li>
                    ${
                        this.renderCommandeUser(com.user)
                    }
                </li>
                <li>
                    <ul  class='articles'>
                        ${com.articles.map(
                            article=>{
                                return this.renderCommandeArticle(article)
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

    getMsgs(cb){
        return this.askContactMsgs(cb)
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

    askContactMsgs(cb){
        this.sio.whenUuidentified(
            ()=>{
                this.sio.post(
                    'cliMsgs',{},(msgs)=>{
                        this.data.messages = msgs
                        if(cb)cb(msgs)
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
    incrementCartUnit(id){
        if(this.cart.articles.length){
            this.cart.articles = this.cart.articles.map(
                article=>{
                    if(article.id == id) article.quantite++
                    return article
                }
            )
        }
    }
    decrementCartUnit(id){
        if(this.cart.articles.length){
            this.cart.articles = this.cart.articles.map(
                article=>{
                    if(article.id == id) article.quantite--
                    return article
                }
            )
        }
    }
    delCartProd(id){
        if(this.cart.articles.length){
            let ærticles = []
            this.cart.articles.forEach(
                article=>{
                    if(article.id != id) articles.push(article)
                }
            )
            this.cart.articles = articles
        }
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

    constructor(isAdmin = false,gotContactForms){
        super()
        console.log("RUNNING TSHOP...")
        console.log("Auteur: EL HADJI SEYBATOU MBENGUE (TEK-TECH)")
        console.log('http://tektech.rf.gd')
        this.isadmin = isAdmin
        this.gotcform = gotContactForms
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
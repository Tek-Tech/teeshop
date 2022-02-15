const { articles } = require("./core/learn/tbs");
const TeeShop = require("./TeeShop");
TeeShop._sd_conf()
TeeShop._sd_creds()



new TeeShop(TeeShop._d_conf(),TeeShop._d_creds(),(shop)=>{
    
    
    shop.setData(
        ()=>{
            shop.categories(
                (e,categories)=>{
                    if(categories&&categories.length){
                        categories.map(
                            cat=>{
                                cat.articles(
                                    articles=>{
                                        if(articles&&articles.length)console.log(articles)
                                    }
                                )
                            }
                        )
                    }
                }
            )
        }
    )

})
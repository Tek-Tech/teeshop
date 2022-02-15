const TeeShop = require("./TeeShop");
TeeShop._sd_conf()
TeeShop._sd_creds()



new TeeShop(TeeShop._d_conf(),TeeShop._d_creds(),(shop)=>{

    shop.dataaction(
        'insert','article_cat',(e,r)=>{
            console.log(e ? `errors in inserting new article ${e}` : `success adding article ${r}`)
            shop.setData(
                ()=>{
                    console.log(shop.data)
                }
            )
        },1,{nom:'testons le',prix:1500}
    )


})
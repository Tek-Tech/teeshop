const TeeShop = require("./TeeShop");
TeeShop._sd_conf()
TeeShop._sd_creds()



new TeeShop(TeeShop._d_conf(),TeeShop._d_creds(),(shop)=>{
    
    
    shop.setData(
        ()=>{
            console.log(shop.data)
        }
    )


})
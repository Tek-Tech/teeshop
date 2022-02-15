const TeeShop = require("./TeeShop");
TeeShop._sd_conf()
TeeShop._sd_creds()



new TeeShop(TeeShop._d_conf(),TeeShop._d_creds(),(shop)=>{

    // console.log(
    //     shop.data
    // )

    shop.loguser(
        'admin','teeteetee',(user)=>{
            console.log(user)
        },'admin'
    )










})
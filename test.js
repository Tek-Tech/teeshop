const TeeShop = require("./TeeShop");
TeeShop._sd_conf()
TeeShop._sd_creds()
const shop = new TeeShop(TeeShop._d_conf(),TeeShop._d_creds())
shop.whenReady(
    ()=>{

        console.log("successfully initialised shop")

    }
)
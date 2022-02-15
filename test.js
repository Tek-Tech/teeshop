const TeeShop = require("./TeeShop");
TeeShop._sd_conf()
TeeShop._sd_creds()



new TeeShop(TeeShop._d_conf(),TeeShop._d_creds(),(shop)=>{

    // console.log(
    //     shop.data
    // )

    // shop.setData(
    //     ()=>{
    //         console.log(shop.data)
    //     }
    // )

    shop.dataaction(
        'insert','categorie',{nom:'all'},(e,r)=>{

            console.log(e ? `errors in inserting new category ${e}` : `success adding category ${r}`)
            

        }
    )
    // shop.loguser(
    //     'client','teeteetee',(user)=>{
    //         console.log(user)
    //     }
    // )





})
function logger(req,res, next) {
    console.log(
        `${new Date} --- ${req.url}   ---- ${req.ip}`
    ) 
    next();
}

function parolaKontrol(req,res,next){
    const parola = req.query.parola;
    console.log("Parola: " + parola)
    if (parola === 'fsweb1122'){
        console.log("Hoş geldin!..")
       next();
    } else {
        console.log("Yanlış parola. Giremezsin...")
        next({message: "Giremezsin!!!"})
    }

}

module.exports = {
    logger,
    parolaKontrol
}
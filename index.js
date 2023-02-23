/*
1- Server requirements için package.json'a 
    1.1 scripts'e start ve server ekledik.
    1.2 dependencies ve devDependencies ekledik.
    1.3 npm i çalıştırdık
    1.4 .gitignore ekledik!!!! :)
2- Server setup
3- Routing öğrendik. 
4- Getting Parameters öğrendik
    4.1 query strings
    4.2 route parameters
    4.3 request body
5- Organizing files and folders for better project management öğrendik
6- Router'ı öğrendik.
    6.1 export router
    6.2 import router
    6.3 configure router
7- middleware öğrendik
    7.1 normal middleware
    7.2 error handler middleware
*/

//2- Server setup
const express = require("express");
const server = express();

const path = require("path");
server.use(express.json());
require("dotenv").config();

// 6.2-import
const hobbitsRouter = require("./api/hobbits/hobbits-router");
const racesRouter = require("./api/races/races-router");

// global middleware'lerimiz
function getLog(req, res, next) {
  /* console.log(
        `${new Date} --- ${req.url}   ---- ${req.ip}`
    ) */
  console.log("Parola'yı söyle:");
  next();
}
function isAuthUser(req, res, next) {
  if (isAuthenticated) {
    next();
  } else {
    //res.status(403).send("<h1>Giremezsin!!! Önce Login olmanız lazım</h1>");
    next({ message: "Giremezsin!!! Önce Login olmanız lazım" });
  }
}

server.use(getLog);

//3- Routing örneği
server.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: process.env.MESSAGE || "Hey, server is up and running...",
  });
});

/*
 Bir challenge: 
  /auth       querysting parola=fsweb1122 ise bu kişi biriş yapabilir.
  /hobbits    auth ile doğru parola ile giriş yaptı ise hobbitleri geri dönsün. yoksa ekranda hata mesajı versin.
*/
let isAuthenticated = false;
server.get("/auth", (req, res) => {
  const parola = req.query.parola;
  console.log("Parola: " + parola);
  if (parola === "fsweb1122") {
    console.log("Hoş geldin!..");
    res.status(200).send("<h1>Hoş geldiniz</h1>");
    isAuthenticated = true;
  } else {
    console.log("Yanlış parola. Giremezsin...");
    res.status(403).send("<h1>Giremezsin!!! Yanlış bilgileri kullandın.</h1>");
  }
});

// 6.3-Configure router
server.use("/hobbits", isAuthUser, hobbitsRouter);
server.use("/races", racesRouter);

// Error middleware testi için bir örnek
server.get("/download", (req, res, next) => {
  const filePath = path.join(__dirname, "index.html");
  res.sendFile(filePath, (err) => {
    if (err) {
      next({ message: "hata oluştu" }); //Error middleware'e yönlendirdik
    } else {
      console.log("başarılı");
    }
  });
});

// error middleware
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message || "hata aldık" });
});

//2- Server setup
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

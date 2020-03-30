const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const port = 5500;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
let activity = [];
let pekerjaan = [];
app.get("/", (req, res) => {
    let today = new Date();
    let hariIni = today.getDay();
    let hari = "";

    // res.write digunakan untuk memberika 2 req dari
    let options = {
        weekday : "long",
        day : "numeric",
        month : "long",
    };
  
    let day = today.toLocaleDateString("en-US",options);
    res.render("list", { tes: day, daftar:activity });
});

app.post('/', function (req, res) {
    console.log(req.body);
     let item = req.body.aktifitas;
  
     if(req.body.list =="work"){
         pekerjaan.push(item);
         res.redirect("/work");
     }else{
        activity.push(item);
         res.redirect("/");
     }
    // res.render("list", {  tes: day, daftar:aktivitas  });
})

app.get('/about', (req, res) => {
    res.render("about");
})

app.get('/work', (req, res) => {
    res.render("list",{ tes: "work Item", daftar:pekerjaan }); 
})
app.post('/work', function (req, res) {
    let item = req.body.aktifitas;
    pekerjaan.push(item);
    redirect("/work");
}); 


app.listen(port, () => console.log(`Example app listening on port port!`));

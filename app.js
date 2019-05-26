const express = require("express");
const bodyParser = require("body-parser");
const hbs = require("express-handlebars");
const mongoose = require("mongoose");

let EmployeData = require("./database/schema");

let app = express();
mongoose.connect("mongodb://localhost:27017/EmployeData");

app.engine("hbs",hbs({extname:"hbs", defaultLayout:"default", layoutsDir:__dirname+"/views"}));
app.set("view engine","hbs");
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req,res)=>{
    res.render("form",{title:"Insert Employee"});
});

app.post("/insert", (req,res)=>{
    if(req.body.id == ""){
        let data = new EmployeData({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            city: req.body.city
        });
        data.save();
    }else{
        EmployeData.findById(req.body.id, (err,doc)=>{
            doc.name= req.body.name,
            doc.email= req.body.email,
            doc.mobile= req.body.mobile,
            doc.city= req.body.city,
            doc.save();
        });
    }    
    res.redirect("/showData");
});

app.get("/showData", (req,res)=>{
    EmployeData.find().then( (doc)=>{
        res.render("showData",{data:doc});
    });
});

app.get("/delete/:id", (req,res)=>{
    let id = req.params.id;
    EmployeData.findByIdAndRemove(id).exec();
    res.redirect("/showData");
});

app.get("/:id", (req,res)=>{
    let id = req.params.id;
    EmployeData.findById(id, (err,doc)=>{
        res.render("form",{title:"Update Employee",data:doc});
    });
});
app.listen(8888,console.log("server is runnig"));
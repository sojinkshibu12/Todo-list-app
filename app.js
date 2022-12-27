const request = require('request');
const express = require("express");
const { appendFile } = require("fs");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");




mongoose.connect("mongodb://localhost:27017/todolist");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));


const itemschema = {
    name:String
}
const Item = mongoose.model("Item", itemschema);



app.get("/",function(req,res){
    Item.find({},function(err,result){


        

        res.render("main",{itemlist:result });
        

    })


    
});

app.post("/",function(req,res){
    const newitem = req.body.newItem;
    const item = new Item({name:newitem});
    item.save();
    
    res.redirect("/");
})
// const list = ["dishes","studying"];
app.post("/delete",function(req,res){
    Item.findByIdAndRemove(req.body.button, function(err){
        if(!err){
            console.log("deleted");
        }
        res.redirect("/");
    });
});
app.listen(3000,function(){
    console.log("server started in port 3000.");
    
});

const express=require("express");
const app=express();
const {Port}=require("./config/serverConfig");
const apiRoutes=require("../Routes");
const bodyParser=require("body-parser");



function startServer(){
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  
  app.use("/api",apiRoutes);

  app.listen(Port,()=>{
    console.log("Server Started at port ",Port);
  })
}

startServer();
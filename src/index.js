const express=require("express");
const app=express();
const {Port}=require("./config/serverConfig");
const apiRoutes=require("../Routes");
const bodyParser=require("body-parser");
const {BookingRepository}=require("../Repository");


async function startServer(){
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  
  app.use("/api",apiRoutes);

  const bookingRepository=new BookingRepository();
  const booking=await bookingRepository.create({flightId:2,userId:5,status:"Booked"})
  console.log("booking ",booking);

  app.listen(Port,()=>{
    console.log("Server Started at port ",Port);
  })
}

startServer();
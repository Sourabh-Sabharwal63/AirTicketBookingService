const express=require("express");
const app=express();
const {Port}=require("./config/serverConfig");
const apiRoutes=require("../Routes");
const bodyParser=require("body-parser");
const bookingService=require("../Service/BookingService");

async function startServer(){
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  
  app.use("/api",apiRoutes);
  // const dummyData={
  //   flightId:2,
  //   userId:1,
  //   NoOfSeats:3,
  //   status:"Booked"
  // };
  
  // const url=`http://localhost:4563/api/v3/flight/updateFlight`;

  // const apiData=await axios.get(url);
  // console.log("apiData = ",apiData.data.data);
  
  // const dummyData=  {
  //   id: 2,
  //   flightNumber: 'Uk007',
  //   airplaneId: 3,
  //   departureAirportId: 13,
  //   arrivalAirportId: 15,
  //   departureTime: '2025-01-07T10:30:00.000Z',
  //   arrivalTime: '2025-01-07T14:30:00.000Z',
  //   price: 12000,
  //   boardingGate: '904',
  //   totalSeat: 450,
  //   createdAt: '2025-01-07T18:10:35.000Z',
  //   updatedAt: '2025-01-15T10:39:54.000Z'
  // };

  // const response=await axios.patch(url,dummyData)

  // console.log("response = ",response);

  // const bookingRepository=new BookingRepository();
  // const booking=await bookingRepository.create({flightId:2,userId:5,status:"Booked"})
  // console.log("booking ",booking);

  app.listen(Port,()=>{
    console.log("Server Started at port ",Port);
  })
}

startServer();
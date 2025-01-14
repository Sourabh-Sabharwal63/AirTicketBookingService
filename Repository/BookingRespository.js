const {ValidationError,AppError}=require("../utils");
const {StatusCodes}=require("http-status-codes");
const {Booking}=require("../models");

class BookingRepository{
  
  async create({flightId,userId,status}){
    try {
     const booking=await Booking.create({
      flightId:flightId,
      userId:userId,
      status:status
     });
     return booking;
      
    } catch (error) {
      if(error.name=="SequelizeValidationError"){
        throw new ValidationError(error);
      }
      throw new AppError("Repository Error",
        "cannot create Booking",
        "There is some issue creating the booking, please try again later",
         StatusCodes.INTERNAL_SERVER_ERROR  
      )
    }
  }
}

module.exports=BookingRepository;
const bookingService=require("../Service/BookingService");

const createBooking=async(req,res)=>{
  try {
    const booking=await bookingService.createBooking(req.body);
    res.status(200).json({
      data:booking,
      message:"booking is created successfully",
      success:true
    })
  } catch (error) {
    res.status(500).json({
      error:error.message,
      success:false,
      message:"something went wrong!"
    })
  }
}

const deleteBooking=async(req,res)=>{
  try {
    console.log("req.body.bookingId = ",req.body.bookingId);
    
    const response=await bookingService.deleteBooking(req.body.bookingId);
    res.status(200).json({
      data:response,
      success:true,
      message:"Booking is deleted successfully"
    })
  } catch (error) {
    res.status(500).json({
      error:error.message,
      success:false,
      message:"Booking is not deleted "
    })
  }
}

module.exports={createBooking,deleteBooking};
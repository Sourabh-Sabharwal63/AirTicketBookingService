const express=require("express");
const router=express.Router();
const {BookingControllers}=require("../../Controller");


router.post("/Booking/create",BookingControllers.createBooking);
router.delete("/Booking/delete",BookingControllers.deleteBooking);
module.exports=router;
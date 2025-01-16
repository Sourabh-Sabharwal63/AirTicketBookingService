const { ValidationError, AppError } = require("../utils");
const { StatusCodes } = require("http-status-codes");
const { Booking } = require("../models");
const axios = require("axios");
class BookingRepository {
  async create(data) {
    try {
      const booking = await Booking.create({
        flightId: data.flightId,
        userId: data.userId,
        status: data.status,
        NoOfSeats: data.NoOfSeats,
        totalCost: data.totalCost,
      });
      return booking;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      throw new AppError(
        "Repository Error",
        "cannot create Booking",
        "There is some issue creating the booking, please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateBooking(data) {
    try {
      const booking = await Booking.update(data, {
        where: {
          id: data.id,
        },
      });
      return booking;
    } catch (error) {
      console.log("something went wrong on Repository layer in updateBooking");

      throw error;
    }
  }

  async deleteBooking(bookingId) {
    try {
      const booking = await Booking.findByPk(bookingId);
      await Booking.destroy({
        where: {
          id: bookingId,
        },
      });
      return booking;
    } catch (error) {
      console.log("something went wrong on Repository layer in destroy");
      throw error;
    }
  }
}

module.exports = BookingRepository;

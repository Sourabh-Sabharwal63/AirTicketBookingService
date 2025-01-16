const { BookingRepository } = require("../Repository");
const axios = require("axios");
const getFlightUrl = `http://localhost:4563/api/v3/flight/getFlight/`;
const updateFlightUrl = `http://localhost:4563/api/v3/flight/updateFlight`;
class BookingService {
  constructor(bookingRepository = new BookingRepository()) {
    this.bookingRepository = bookingRepository;
  }

  async createBooking(data) {
    try {
      const getFlightUrlComp = getFlightUrl + `${data.flightId}`;
      const flightData = (await axios.get(getFlightUrlComp)).data.data;
      console.log("flightData = ", flightData);
      const booking = await this.bookingRepository.create({
        ...data,
        totalCost: flightData.price * data.NoOfSeats,
      });
      console.log("booking = ", booking);
      flightData.totalSeat = flightData.totalSeat - data.NoOfSeats;
      const response = (await axios.patch(updateFlightUrl, flightData)).data
        .data;
      console.log("update Response is => ", response);
      return booking;
    } catch (error) {
      throw error;
    }
  }
  async deleteBooking(bookingId) {
    try {
      const booking = await this.bookingRepository.deleteBooking(bookingId);

      const getFlightUrlComp = getFlightUrl + `${booking.flightId}`;
      console.log("getFlightUrlCom = ", getFlightUrlComp);
      const flightData = (await axios.get(getFlightUrlComp)).data.data;
      console.log("flightData = ", flightData);

      flightData.totalSeat = flightData.totalSeat + booking.NoOfSeats;

      const response = (await axios.patch(updateFlightUrl, flightData)).data;
      console.log("response = ", response);

      return response.data;
    } catch (error) {
      console.log("something went wrong on service layer in deleteBooking");
      throw error;
    }
  }
}

module.exports = new BookingService();

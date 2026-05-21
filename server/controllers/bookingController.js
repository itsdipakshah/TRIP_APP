import { Booking } from "../models/bookingModel.js";
import { Trip } from "../models/tripModel.js";

// Get all bookings
export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
       
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error });
    }
}

//get booking by id
export const getBookingById = async(req,res)=>{
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id).populate('tripId','title destination date price');
       
        res.status(200).json(booking);
    } catch (error) {
       res.status(500).json({ message: "Error fetching booking", error }); 
    }
}

//get all bookings of a user
export const getMybookings= async(req,res)=>{
    try {
        const bookings = await Booking.find({ customerId: req.user.userId }).populate('tripId','title destination date price');
       
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching my bookings", error });
    }
}



//add all bookings

export const addBooking = async (req, res)=>{
    try {
        const {  email, phone, tripId, numberOfPeople} = req.body;

        if(  !email || !phone || !tripId || !numberOfPeople) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newBooking = new Booking({
            userName: req.user.name,
            email,
            phone,
            tripId,
            numberOfPeople,
            totalPrice: numberOfPeople * (await Trip.findById(tripId)).price,
            tripId: tripId,
            customerId: req.user.userId,
        });

        await newBooking.save();

        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }
         
        if (trip.availableSeats < numberOfPeople) {
            return res.status(400).json({ message: "Not enough available seats" });
        }

        trip.availableSeats -= numberOfPeople;
        await trip.save();

        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);

    } catch (error) {
        res.status(500).json({ message: "Error adding booking", error });
    }
}
//update booking

export const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { status} = req.body;

        if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const booking = await Booking.findByIdAndUpdate(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (
      status !== "pending" &&
      status !== "confirmed" &&
      status !== "cancelled"
    ) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: "Error updating booking", error });
    }
}


//delete booking

export const deleteBooking = async (req, res)=>{
    try {
        const { id } = req.params;
        const booking = await Booking.findByIdAndDelete(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting booking", error });
    }
}

import { Booking } from "../models/bookingModel.js";

// Get all bookings
export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
        if(bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
        }
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error });
    }
}
//add all bookings

export const addBooking = async (req, res)=>{
    try {
        const { userName, email, phone, tripId, numberOfPeople, totalPrice , bookingDate} = req.body;

        if(!userName || !email || !phone || !tripId || !numberOfPeople || !totalPrice) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newBooking = new Booking({
            userName,
            email,
            phone,
            tripId,
            numberOfPeople,
            totalPrice,
            bookingDate,
            status:'pending'
        });

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

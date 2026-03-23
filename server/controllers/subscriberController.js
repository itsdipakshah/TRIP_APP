import { Subscriber } from "../models/subscriberModel.js";

// I should be able to get the list of subsbcribers (GET)
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    if (subscribers.length === 0) {
      return res.status(404).json({ message: "No subscribers found" });
    }
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subscribers", error });
  }
};

// I should be able to add a subscriber (POST)
export const addSubscriber = async (req, res) => {
  try {
    const { email, source } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      return res.status(400).json({ message: "Subscriber already exists" });
    }

    const newSubscriber = new Subscriber({
      email,
      source,
    });

    await newSubscriber.save();

    res.status(201).json({
      message: "Subscriber added successfully",
      subscriber: newSubscriber,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding subscriber", error });
  }
};

// I should be able to update a subscriber's status (PUT)
export const updateSubsbcriberStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  const existingSubscriber = await Subscriber.findByIdAndUpdate(id);

  if (!existingSubscriber) {
    return res.status(404).json({ message: "Subscriber not found" });
  }

  if (status === "active" || status === "inactive") {
    existingSubscriber.status = status;
    await existingSubscriber.save();
    return res.status(200).json({
      message: "Subscriber status updated successfully",
      subscriber: existingSubscriber,
    });
  } else {
    return res.status(400).json({ message: "Invalid status value" });
  }
};

// I should be able to delete a subscriber (DELETE)
export const deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;

    const existingSubscriber = await Subscriber.findByIdAndDelete(id);

    if (!existingSubscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    await Subscriber.findByIdAndDelete(id);

    res.status(200).json({ message: "Subscriber deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subscriber", error });
  }
};

import { Contact } from "../models/contactModel.js";



// I should be able to get the list of contacts (GET)
export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        if (contacts.length === 0) {
            return res.status(404).json({ message: "No contacts found" });
        }
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching contacts", error });
    }
}


// I should be able to add a contact (POST)

export const addContact = async (res,req)=>{
    try {
        const {name,email,message} = req.body;
        if(!name || !email || !message){
            return res.status(400).json({message:"All fields are required"})
        }

        const newContact = new Contact({
            name,email,message
        })
        await newContact.save();
        res.status(201).json({message:"Contact added successfully", contact:newContact})

    } catch (error) {
            res.status(500).json({ message: "Error adding contact", error });
    }
}
// I should be able to update a contact's status (PUT)

export const updateContactStatus = async (req,res)=>{
    try {
        const {status} = req.body;
    const {id} = req.params;

    const existingContact = await Contact.findById(id); 

    if(!existingContact){
        res.status(404).json({message:"Contact not found"})
    }

    if(status === "new" || status === "read"){
        existingContact.status = status;
        await existingContact.save();
        return res.status(200).json({message:"Contact status updated successfully", contact:existingContact})
    }
    } catch (error) {
        res.status(500).json({ message: "Error updating contact status", error });
    }
}
// I should be able to delete a contact (DELETE)

export const deleteContact = async (req,res)=>{
    try {
        const { id } = req.params;

        const existingContact = await Contact.findByIdAndDelete(id);

        if (!existingContact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        await Contact.findByIdAndDelete(id);

        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting contact", error });
    }
}


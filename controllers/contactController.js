const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactSchema");

//@description: Get All contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async(req,res)=>{
    const contacts= await Contact.find({user_id: req.user.id});
    console.log(Contact);
    res.status(200).json({contacts});
})



//@description: Postcontact
//@route POST /api/contacts
//@access private
const createContact =asyncHandler(async(req,res)=>{
    console.log("req.body",req.body);
    const {name,phone,email} = req.body;
    if(!name || !phone || !email){
        res.status(400).json({error:"All fields are req"})
    }
   const newContact=await Contact.create({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        user_id:req.user.id
    })
    res.status(200).json(newContact);
})



//@description: Postcontact
//@route GET /api/contacts/id
//@access private
const getContact =asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found")
    }
    res.status(200).json(contact);
})

//@description: Update contact
//@route PUT /api/contacts
//@access private
const updateContact =asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found")
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update others")
    }
    const updatedContact =await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )

    res.status(200).json(updatedContact);
})


//@description: Delete contact
//@route DELETE /api/contacts
//@access public
const deleteContact =asyncHandler(async(req,res)=>{
    const contact = await Contact.findByIdAndDelete(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact Not Found")
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update others")
    }
   
    res.status(200).json({message:`Deleted the id ${req.params.id}`});
})
module.exports={getContacts,createContact,updateContact,deleteContact,getContact}
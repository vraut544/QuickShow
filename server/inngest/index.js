import { Inngest } from "inngest";
import User from "../models/user.js";


export const inngest = new Inngest({ id: "movie-ticket-booking" });

//Inngest function to save user date to MongoDB

const syncUserCreation = inngest.createFunction(
    {id: 'sync-user-from-clerk'},
    {event: 'clerk/user.created'},

    async ({event})=>{
        const {id, first_name, last_name, email_addresses, image_url} = event.data
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            image: image_url
        }
        await User.create(userData)
    }    
)

//Inngest function to delete the user from database

const syncUserDeletion = inngest.createFunction(
    {id: 'delete-user-with-clerk'},
    {event: 'clerk/user.deleted'},

    async ({event})=>{
      const {id} = event.data
      await User.findByIdAndDelete(id)
        }   
)
//Inngest function to update user in MongoDB
const syncUserUpdation = inngest.createFunction(
    {id: 'update-user-from-clerk'},
    {event: 'clerk/user.updated'},

    async ({event})=>{
        const {id, first_name, last_name, email_addresses, image_url} = event.data
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            image: image_url
        }
        await User.findOneAndUpdate(id, userData)
        }   
)

export const functions = [syncUserCreation,syncUserDeletion,syncUserUpdation];
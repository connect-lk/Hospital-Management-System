import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL, {
            dbName: "Hospital_Management_system"
        })
        .then(() => {
            console.log("connected to database")
        }).catch((err) => {
            console.log(`something error occured while connectuing to databse:${err}`)
        })
}
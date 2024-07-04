import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, "First Name Must Contain AT Least 3 characters"]
    },
    lastName: {
        type: String,
        required: true,
        minlength: [3, "Last Name Must Contain AT Least 3 characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide a Valid Email"]
    },
    phone: {
        type: String,
        required: true,
        maxLength: [10, "Phone Number Must Contain At Least 10 Characters"]
    },
    message: {
        type: String,
        required: true,
        minlength: [10, "Message Must Contain At Least 10 Characters"]
    },
})
export const Message = mongoose.model("Message", messageSchema);
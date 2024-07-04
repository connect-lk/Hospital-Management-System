import ErrorHandler from "../middlewares/error.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = async(req, resp, next) => {
    const { firstName, lastName, email, phone, message } = req.body;
    if (!firstName || !lastName || !email || !phone || !message) {
        // return next(new ErrorHandler("Please Fill Full Form!", 400));
        return resp.status(400).json({
            success: false,
            message: "PLease Fill Full Form",
        });
    }
    await Message.create({ firstName, lastName, email, phone, message });
    resp.status(200).json({
        success: true,
        message: "Message Send SuccessFully !",
    })
}
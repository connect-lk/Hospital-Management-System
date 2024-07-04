import { userSchemas } from "../models/userSchema.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utlis/jwtToken.js"
export const userRegister = async(req, resp) => {
        const { firstName, lastName, email, phone, nic, dob, gender, password, role, doctorDepartment, docAvatar } = req.body

        if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password || !role || !doctorDepartment || !docAvatar) {
            return resp.status(400).json({ status: false, message: "Please Fill the Full Form" })
        }

        const findUser = await userSchemas.findOne({ email: email })
        if (findUser) {
            return resp.status(400).json({ status: false, message: "This email already exists !" })
        }

        // await Message.create({ firstName, lastName, email, phone, message });
        // resp.status(200).json({
        //     success: true,
        //     message: "Message Send SuccessFully !",
        // })
        const passwordhash = await bcrypt.hash(password, 10)
        const userSchema = new userSchemas({ firstName, lastName, email, phone, nic, dob, gender, password: passwordhash, role, doctorDepartment, docAvatar })
        const saveUser = await userSchema.save();

        if (saveUser) {
            return resp.status(200).json({ status: true, message: "User Register SuccessFully !" })
        } else {
            return resp.status(400).json({ status: false, message: "SomeThing Went Wrong, User Not Registered !" })
        }
    }
    // export default userRegister


const login = async(req, resp) => {
    const { email, password, confirmPassword, role } = req.body

    if (password !== confirmPassword) {
        return resp.status(400).json({ status: false, message: "Password and ConfirmPassword Do Not Match !" })
    }
    const user = await userSchemas.findOne({ email }).select("+password")
    if (!user) {
        return resp.status(400).json({ status: false, message: "Invalid Password or Email !" })
    }

    const compairPass = await bcrypt.compare(password, user.password)
    if (!compairPass) {
        return resp.status(400).json({ status: false, message: "Invalid Password or Email !" })
    }

    if (role !== user.role) {
        return resp.status(400).json({ status: false, message: "User With This Role Not Found !" })
    }
    generateToken(user, "Login SuccessFully", 201, resp)
        // return resp.status(200).json({ status: true, message: "You Are Login SuccessFully !" })
}
export default login
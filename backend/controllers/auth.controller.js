import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Ensure to import jwt
import { sendWelcomeMail } from "../emails/emailHandlers.js";

export const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Validate password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be greater than 6 characters" });
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10); // Use genSalt instead of salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      username,
    });
    await user.save();

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    }); // Optional expiration

    // Set the cookie
    res.cookie("jwt-linkedin", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ message: "User registered successfully" });


    //send welcoming mail

   const profileUrl = process.env.CLIENT_URL + "/profile/" + user.username
    try{
        await sendWelcomeMail(user.email,user.name,profileUrl);
    }catch(emailError){
        console.log("Error sending Email ",emailError)
    }



  } catch (err) {
    console.log("Error in signup", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
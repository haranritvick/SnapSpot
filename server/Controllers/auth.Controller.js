import User from "../models/user.models.js"
import bcrypt from 'bcryptjs'
import { createSessionAndSaveCookie } from "../utils/createSession.js"

export const test = async(req,res) =>{
    const userid = req.userId
    res.send(`Inside the test controller ${userid}`)
}

// Login
export const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the email exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
  
      // Compare the entered password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid password" });
      }
  
      // Create session and save cookie
      createSessionAndSaveCookie(req, user._id);
  
      // Respond with user data
      console.log("User LoggedIn Successfully")
      return res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        gender: user.gender,
        phone: user.phone,
      });
    } catch (error) {
      console.error("Error occurred during login", error);
      return res.status(500).json({ error: "Server error" });
    }
  };
  

//Signup
export const Signup = async(req,res) =>{
    try {
        const { username, email, password, confirmpassword, phone, gender } = req.body;

        // Check if password and confirm password match
        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Password and confirm password do not match" });
        }

        // Check if username already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Entered username already exists" });
        }

        // Check if email already exists
        user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "Entered email already exists" });
        }

        // Check if phone number already exists
        user = await User.findOne({ phone });
        if (user) {
            return res.status(400).json({ error: "Entered phone number already exists" });
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        // Create new user instance
        const newUser = new User({
            username,
            email,
            password: hashedpassword,
            phone,
            isAdmin: false,
            gender,
        });

        // Save user to database
        await newUser.save();

        // Generate token and set cookie
        createSessionAndSaveCookie(req,newUser._id); // Ensure this function only sets cookies, doesn't send response

        // Respond with user data
        return res.status(201).json({
            _id: newUser.id,
            username: newUser.username,
            gender: newUser.gender,
            phone: newUser.phone,
        });

    } catch (error) {
        console.error("Error occurred inside the signup page", error);
        return res.status(500).json({ error: "Server error" });
    }
}

// Logout
export const Logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to log out" });
      }
      console.log("User Loggedout Successfully")
      // Clear the cookie
      res.clearCookie('connect.sid'); // or the name of your session cookie
  
      return res.status(200).json({ message: "Successfully logged out" });
    });
};
  



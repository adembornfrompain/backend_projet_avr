const userModel = require("../models/usersSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// module.exports.getAllUsers = async (req, res) => {
//   try {
//     const usersList = await userModel.find();
//     if (!usersList) {
//       throw new Error("user not found");
//     }

//     res.status(200).json(usersList);
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };

module.exports.addClient = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = "client";

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    const userAdded = await newUser.save();

    res.status(200).json(userAdded);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// login

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: "Invalid password" });
    // Use environment variable for JWT secret
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Consider making expiry configurable too
    });
    // Return only essential user info
    const userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    res.status(200).json({ message: "Login successful", token, user: userInfo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// module.exports.addAdmin = async (req, res) => {

module.exports.deleteMyAccount = async (req, res) => {
  try {
    //const userId = req.user.id;
    const Id = req.params.id;
    const user = await userModel.findByIdAndDelete(Id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// module.exports.getUserById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await userModel.findById(id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// };

module.exports.updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    // 1. Check if passwords are provided
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Current and new password are required" });
    }

    // 2. Fetch user (including password)
    const user = await userModel.findById(id).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // 4. Hash new password (auto-salt with cost factor 10)
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 5. Update password (using save() to trigger middleware)
    user.password = hashedPassword;
    await user.save();

    // 6. Respond without exposing user data
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error during password update" });
  }
};

// add image to user 
module.exports.addUserWithImage = async (req, res) => {
  try {
    const { name, email, password, phone, ...otherData } = req.body; // Destructure known fields

    // 1. Basic Validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    // 2. Check for existing user (optional but recommended)
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" }); // 409 Conflict
    }

    // 3. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Prepare User Data
    const userData = {
      name,
      email,
      password: hashedPassword,
      phone, // Include phone if provided
      role: "client", // Explicitly set role (adjust if needed)
      ...otherData, // Include any other fields passed in req.body
    };

    // 5. Add Image if present
    if (req.file) {
      userData.user_image = req.file.filename;
    }

    // 6. Create and Save User
    const newUser = new userModel(userData);
    const savedUser = await newUser.save();

    // 7. Prepare Response Data (exclude sensitive info)
    const userInfo = {
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      phone: savedUser.phone,
      role: savedUser.role,
      user_image: savedUser.user_image,
    };

    res.status(201).json({ message: "User created successfully", user: userInfo }); // 201 Created
  } catch (error) {
    // More specific error handling (e.g., for validation errors) could be added
    console.error("Error adding user with image:", error); // Log error for server admins
    res.status(500).json({ message: error.message || "Server error creating user" });
  }
};

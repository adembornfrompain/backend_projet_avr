;

const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const usersSchema = new mongoose.Schema(
  {
    nom: { type: String },    
    prenom: { type: String },
    email: { type: String},  // required: true, unique: true  }, 
    password: { type: String}, //required: true, minlength: 6 },
    role: {
      type: String,
      enum: [
        "admin",
        "user",
        "client",
        "salesagent",
        "manager",
        "financialofficer",
        "operationofficer",
      ],
      default: "user",
    },
    phone: { type: String, minLength: 8, maxLength: 8 },
    user_image: { type: String },
    status: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

usersSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    const users = this;
    users.password = await bcrypt.hash(users.password, salt);
    isActive = false;

    next();

  } catch (error) {
    next(error);
  }
});

const users = mongoose.model("users", usersSchema);
module.exports = users;

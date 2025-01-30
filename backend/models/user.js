import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [50, "Your name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Your password must be longer than 6 characters"],
      select: false, //this means we do not want to send the passaword in the response to the user
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

//encrypting the passaword before saving the user into the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next(); //if password is modified then we do not have to do anything
  }

  this.password = await bcrypt.hash(this.password, 10); //this will encrypt the password before saving the user and set the password like this
});

// Return JWT Token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

// Compare user password4
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  //generate token
  const resetToken = crypto.randomBytes(20).toString("hex");
  // Hash and set to resetPasswordToken field (save the resetpasswordToken field in the database and in the email we will send the token)
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken; //we will use the resetToken and send the token to the user in the email
};

export default mongoose.model("User", userSchema);

/*encrypting the passaword before saving the user into the database
npm i bcryptjs --save
*/

/*
JWT=> basically we generate a token , which is random string in which we store user ID or
any user data , then we will assign to the token to the user , This user is authorized and then we give 
expire date to that token and then we validate the user or authorized user based in that token and once 
the token is expired , we ask the user to login again .
jwt has a function that is called sign ,Now with that sign function , we can assign a token to the user and 
payload is the data that we want to save in the token

*/
/*    resetPasswordToken: String,
    resetPasswordExpire: Date,
    Once the user send the request to reset the password , we will simply reset password token and then the expire time and then send this
     token in the email , we will verify that token and set the password
    
    
    
    */

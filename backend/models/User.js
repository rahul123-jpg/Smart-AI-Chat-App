import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// password hash
userSchema.pre("save", async function() {
  if (!this.isModified("password")) return ;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

});

// compare password
userSchema.methods.matchPassword = async function(entered) {
  return await bcrypt.compare(entered, this.password);
};

export default mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phones: [
      {
        number: String,
        citycode: String,
        countrycode: String,
        _id: false,
      },
    ],
    isActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;

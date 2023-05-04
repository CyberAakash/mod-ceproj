const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userid: { type: String, required: true },
    password: { type: String, required: true },
    name: String,
    phone_no: String,
    f_name: String,
    f_phone_no: String,
    m_name: String,
    m_phone_no: String,
    dob: String,
    gender: String,
    mail: String,
    f_mail: String,
    addr: String,
    course: String,
    tenth: String,
    twelfth: String,
    e_mark: String,
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema, "users");

module.exports = User;
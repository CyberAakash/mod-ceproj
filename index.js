// Importing Libraries
var express = require("express");
var router = express();
var bodyParse = require("body-parser");
var mongoose = require("mongoose");
const { request, response } = require("express");

// MODELS
const User = require("./models/user");

// Creating app
var exp = require("express");
const app = exp();
app.engine("html", require("ejs").renderFile);
app.use(exp.static("./public"));
app.use(bodyParse.json());
app.use(express.static("public"));
app.use(
  bodyParse.urlencoded({
    extended: true,
  })
);
mongoose.connect("mongodb://0.0.0.0:27017/oas", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;

// Checking for connection

db.on("error", () => console.log("error in Creating database"));
db.once("open", () => console.log("Connected to database."));

app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/home.html");
});
app.get("/about", (req, res) => {
  return res.sendFile(__dirname + "/about.html");
});
app.get("/academic", (req, res) => {
  return res.sendFile(__dirname + "/academic.html");
});
app.get("/fee", (req, res) => {
  return res.sendFile(__dirname + "/fee.html");
});
app.get("/admission", (req, res) => {
  return res.sendFile(__dirname + "/admission.html");
});
app.get("/carrier", (req, res) => {
  return res.sendFile(__dirname + "/carrier.html");
});
app.get("/signup", (req, res) => {
  return res.sendFile(__dirname + "/signup.html");
});
app.get("/stud_login", (req, res) => {
  return res.sendFile(__dirname + "/stud_login.html");
});
app.get("/adm_login", (req, res) => {
  return res.sendFile(__dirname + "/adm_login.html");
});
app.get("/signup_suc", (req, res) => {
  return res.sendFile(__dirname + "/signup_suc.html");
});
app.get("/admin", (req, res) => {
  return res.sendFile(__dirname + "/admin.html");
});
app.get("/student", (req, res) => {
  return res.sendFile(__dirname + "/student.html");
});
app.get("/student/upload", (req, res) => {
  return res.sendFile(__dirname + "/upload.html");
});
app.get("/login_suc", (req, res) => {
  return res.sendFile(__dirname + "/login_suc.html");
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  const user = new User({
    userid: req.body.userid,
    password: req.body.userpass1,
  });

  if (req.body.userpass1 == req.body.userpass2) {
    user.save().then(() => {
      res.redirect("/signup_suc");
    });
  } else {
    console.log("Password Mismatch");
  }
});

app.post("/stud_login", (request, response) => {
  console.log(request.body);
  try {
    const userid = request.body.userid;
    const password = request.body.userpass1;
    const userinfo = db.collection("users").findOne(
      {
        userid: userid,
      },
      (err, res) => {
        if (res === null) {
          return response.send(
            "Information not match.Please craete account first"
          );
        } else if (err) throw err;
        if (res.password === password) {
          console.log("Login Successfull.");
          response.render(__dirname + "/login_suc.html");
        } else {
          console.log("Password doesnt match.");
          response.send("Password Not Match");
        }
      }
    );
  } catch (error) {
    console.log("Invalid.");
  }
});

app.post("/student/upload", (request, response) => {
  const {
    name,
    phone_no,
    f_name,
    f_phone_no,
    m_name,
    m_phone_no,
    dob,
    gender,
    mail,
    f_mail,
    addr,
    course,
    tenth,
    twelfth,
    e_mark,
    userid,
    password,
  } = request.body;

  db.collection("users")
    .updateOne(
      { userid: userid, password: password }, // filter by the user ID
      {
        $set: {
          name: name,
          phone_no: phone_no,
          f_name: f_name,
          f_phone_no: f_phone_no,
          m_name: m_name,
          m_phone_no: m_phone_no,
          dob: dob,
          gender: gender,
          mail: mail,
          f_mail: f_mail,
          addr: addr,
          course: course,
          tenth: tenth,
          twelfth: twelfth,
          e_mark: e_mark,
        },
      }
    )
    .then(() => {
      response.redirect("/student");
    });
});

// const uploadSchema = new mongoose.Schema({
//   sname: String,
//   sphone: Number,
//   fname: String,
//   fphone: Number,
//   mname: String,
//   mphone: Number,
//   DOB: Number,
//   gender: String,
//   mail: String,
//   mail1: String,
//   address: String,
//   course: String,
//   marks1: Number,
//   marks2: Number,
//   jee: Number,
// });
// const Upload = mongoose.model("upload", uploadSchema);

app.listen(3000, () => {
  console.log("Server Listening");
});

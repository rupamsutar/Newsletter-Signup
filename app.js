const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing")

const app = express();

app.use(express.static(__dirname +"/public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res) {
  res.sendFile( __dirname + "/signup.html");
});

mailchimp.setConfig({
  apiKey: "38a85612af8f1e7a6702ac0fd2e3832f-us12",
  server: "us12"
});

app.post("/", function(req,res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  async function addMember() {
    const response = await mailchimp.lists.addListMember("3b0fa7c633", {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    });
    res.sendFile(__dirname + "/success.html");
    console.log("successfully added a contact as a audience Member ! ")
  };
   addMember().catch(e => res.sendFile(__dirname + "/failure.html"));
});

app.post("/failure", function(req,res) {
  res.redirect("/");
});

app.post("/success", function(req,res) {
  res.redirect("/");
});

app.listen(process.env.PORT ||3000, function() {
  console.log("Server is running on port 3000 !");
});


//Api Key : 38a85612af8f1e7a6702ac0fd2e3832f-us12

//List ID: 3b0fa7c633   3b0fa7c633

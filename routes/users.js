var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const userHelpers = require('../helpers/user-helpers');

router.use("/", (req, res, next) => {
  req.app.locals.layout = "layout";
  next();
});

router.get('/', (req,res)=>{
  res.render('users/home', {user: true});
})

router.get("/about", (req, res) => {
  res.render("users/about", { user: true });
});

router.get("/services",async (req, res) => {
  let service = await userHelpers.getServiceDetails();
  res.render("users/services", {service, user: true });
});

router.get("/contact", (req, res) => {
  res.render("users/contact", { user: true });
});

router.get('/pre-press', async(req, res) => {
  let prepress = await userHelpers.getPrePressDetails();
  res.render("users/pre-press", { user: true, prepress });
});

router.get("/press", async(req, res) => {
  let press = await userHelpers.getPressDetails();
  res.render("users/press", { user: true, press });
});

router.get("/post-press", async(req, res) => {
  let postpress = await userHelpers.getPostPressDetails();
  res.render("users/post-press", { user: true, postpress });
});

router.get("/getaqoute", async(req, res) => {
  res.render("users/getaqoute", { user: true});
});


router.post("/getaqoute", (req, res) => {
  let from = req.body.from;
  let to = req.body.to;
  let name = req.body.name;
  let phone = req.body.phone;
  let message = req.body.message;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yoursiteuser@gmail.com",
      pass: "gkfqsbchvbqunxou",
    },
  });

  let mailOptions = {
    from: from,
    to: to,
    subject: "Quote Request",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <h2 style="color: #333;">Quote Request</h2>
        <p style="font-size: 16px;">Email: ${from}</p>
        <p style="font-size: 16px;">Name: ${name}</p>
        <p style="font-size: 16px;">Phone: ${phone}</p>
        <p style="font-size: 16px;">Message: ${message}</p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error){
      console.log(error);
    } else {
      console.log("Email send:" + info.response);
    }
    res.redirect('/getaqoute', "/getaqoute", { user: true });
  })
});

router.post("/contact", (req, res) => {
  let from = req.body.from;
  let to = req.body.to;
  let name = req.body.name;
  let message = req.body.message;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yoursiteuser@gmail.com",
      pass: "gkfqsbchvbqunxou",
    },
  });

  let mailOptions = {
    from: from,
    to: to,
    subject: "Quote Request",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <h2 style="color: #333;">Quote Request</h2>
        <p style="font-size: 16px;">Email: ${from}</p>
        <p style="font-size: 16px;">Name: ${name}</p>
        <p style="font-size: 16px;">Message: ${message}</p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email send:" + info.response);
    }
    res.redirect("/contact", "/contact", { user: true });
  });
});

module.exports = router;

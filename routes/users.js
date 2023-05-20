var express = require('express');
var router = express.Router();
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

module.exports = router;

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

router.get('/pre-press', (req, res) => {
  res.render("users/pre-press", { user: true });
});

router.get("/press", (req, res) => {
  res.render("users/press", { user: true });
});

router.get("/post-press", (req, res) => {
  res.render("users/post-press", { user: true });
});

module.exports = router;

var express = require('express');
var router = express.Router();

router.use("/", (req, res, next) => {
  req.app.locals.layout = "layout";
  next();
});

router.get('/', (req,res)=>{
  res.render('users/home')
})

router.get("/about", (req, res) => {
  res.render("users/about");
});

router.get("/services", (req, res) => {
  res.render("users/services");
});

router.get("/contact", (req, res) => {
  res.render("users/contact");
});

module.exports = router;

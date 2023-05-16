var express = require('express');
var router = express.Router();

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

router.get("/services", (req, res) => {
  res.render("users/services", { user: true });
});

router.get("/contact", (req, res) => {
  res.render("users/contact", { user: true });
});

module.exports = router;

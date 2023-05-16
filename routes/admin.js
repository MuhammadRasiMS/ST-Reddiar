var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/home',{admin:true});
});

router.get('/login', (req, res, next) => {
  res.render('admin/login', {admin:true} );
})

router.get('/service', (req,res)=>{
  res.render('admin/service', {admin:true} );
})

router.get('/add-service', (req,res)=> {
  res.render('admin/add-service', {admin:true});
})

module.exports = router;

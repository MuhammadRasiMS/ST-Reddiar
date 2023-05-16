var express = require('express');
var router = express.Router();
const {upload} = require('../public/javascripts/fileUpload')

let admin = {
  email: 'admin@gmail.com',
  password: '12345'
}

function verifyAdmin(req,res,next) {
  if (req.session.adminLoggedIn) {
    return next();
  }
  res.redirect('/admin/login');
}

/* GET home page. */
router.get('/',verifyAdmin, (req, res, next) => {
  res.render('admin/home',{admin:true});
});

router.get('/login', (req, res, next) => {
  if(req.session.adminLoggedIn){
    res.redirect('/admin')
  } else {
    res.render('admin/login', {adminLoginErr: req.session.adminLoginErr});
    adminLoginErr = false;
  }
})

router.post('/login', (req,res) => {
  if (req.body.email === admin.email && req.body.password === admin.password) {
    req.session.admin = req.body;
    req.session.adminLoggedIn = true;
    res.redirect('/admin')
  } else {
    req.session.adminLoginErr = "Invalid admin"
    res.redirect('/admin/login')
  }
});

router.get('/logout', (req,res) => {
  req.session.admin = null;
  req.session.adminLoggedIn = false;
  res.redirect('admin/login');
});

router.get('/service', verifyAdmin, (req,res)=>{
  res.render('admin/service', {admin:true} );
})

router.get('/add-service', verifyAdmin, (req,res)=> {
  res.render('admin/add-service', {admin:true});
})

router.post('/add-service', verifyAdmin, upload.any('image'),  (req,res)=>{
  const files = req.files;
  const file = files.map((file) => {
    return file
  })
  const fileName = file.map((file) => {
    return file.filename
  })
  const service = req.body
  service.img = fileName;

  res.redirect('admin/service');
});

module.exports = router;

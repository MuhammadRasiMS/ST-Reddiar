var express = require('express');
var router = express.Router();
const {upload} = require('../public/javascripts/fileUpload')
let adminHelpers = require('../helpers/admin-helpers');

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
    res.render('admin/login', {adminLoginErr: req.session.adminLoginErr, login:true});
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

router.get("/service", verifyAdmin, (req, res) => {
  adminHelpers.getServicesDetails().then((service) => {
    res.render("admin/service", { service, admin: true });
  });
});

router.get('/add-service', verifyAdmin, (req,res)=> {
    res.render('admin/add-service', {admin:true});
});

router.post('/add-service', upload.any('image'),  (req,res)=>{
  const files = req.files;
  const file = files.map((file) => {
    return file
  })
  const fileName = file.map((file) => {
    return file.filename
  })
  const service = req.body
  service.img = fileName;
  adminHelpers.addService(req.body).then(response => {
    console.log(response);
    res.redirect('/admin/service');
  })
});

router.get('/delete-service/:id', verifyAdmin, (req, res)=>{
  let serviceId = req.params.id;
  adminHelpers.deleteService(serviceId).then(()=>{
    res.redirect('/admin/service');
  })
})

router.get('/edit-service/:id', verifyAdmin, (req, res) => {
  adminHelpers.getServiceDetails(req.params.id).then(serviceData => {
    console.log(serviceData);
    res.render('admin/edit-service', {serviceData: serviceData, admin:true})
  })
})

router.post('/edit-service/:id', upload.any('image'), async(req,res) => {
  let id = req.params.id;
  let oldId = await adminHelpers.getServiceDetails(id);
  const file = req.files;
  let filename;
  req.body.img =
    req.files.length != 0
      ? (filename = file.map((file) => {
          return file.filename;
        }))
      : oldId.img;
  adminHelpers.updateService(req.params.id, req.body).then(()=>{
    res.redirect('/admin/service');
  })
})

module.exports = router;

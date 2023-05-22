var express = require('express');
var router = express.Router();
const {upload, upload2, upload3, upload4} = require('../public/javascripts/fileUpload')
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
//---------------------prepress---------------------------------------
router.get('/pre-press', verifyAdmin, (req, res) => {
  adminHelpers.getPrePressesDetails().then((prepress) => {
    res.render('admin/pre-press', {admin:true, prepress})
  })
})

router.get("/add-pre-press", verifyAdmin, (req, res) => {
  res.render("admin/add-pre-press", { admin: true });
});

router.post("/add-pre-press", upload2.any("image"), (req, res) => {
  const files = req.files;
  const file = files.map((file) => {
    return file;
  });
  const fileName = file.map((file) => {
    return file.filename;
  });
  const prepress = req.body;
  prepress.img = fileName;
  adminHelpers.addPrePress(req.body).then((response) => {
    console.log(response);
    res.redirect("/admin/pre-press");
  });
});

router.get("/delete-prepress/:id", verifyAdmin, (req, res) => {
  let prepressId = req.params.id;
  adminHelpers.deletePrePress(prepressId).then(() => {
    res.redirect("/admin/pre-press");
  });
});

router.get("/edit-prepress/:id", verifyAdmin, (req, res) => {
  adminHelpers.getPrePressDetails(req.params.id).then((prepressData) => {
    res.render("admin/edit-pre-press", {
      prepressData: prepressData,
      admin: true,
    });
  });
});

router.post("/edit-prepress/:id", upload2.any("image"), async (req, res) => {
  let id = req.params.id;
  let oldId = await adminHelpers.getPrePressDetails(id);
  const file = req.files;
  let filename;
  req.body.img =
    req.files.length != 0
      ? (filename = file.map((file) => {
          return file.filename;
        }))
      : oldId.img;
  adminHelpers.updatePrePress(req.params.id, req.body).then(() => {
    res.redirect("/admin/pre-press");
  });
});

//------------------------------press-----------------------------------------------------------

router.get("/press", verifyAdmin, (req, res) => {
  adminHelpers.getPressesDetails().then((press) => {
    res.render("admin/press", { admin: true, press });
  });
});

router.get("/add-press", verifyAdmin, (req, res) => {
  res.render("admin/add-press", { admin: true });
});

router.post("/add-press", upload3.any("image"), (req, res) => {
  const files = req.files;
  const file = files.map((file) => {
    return file;
  });
  const fileName = file.map((file) => {
    return file.filename;
  });
  const press = req.body;
  press.img = fileName;
  adminHelpers.addPress(req.body).then((response) => {
    res.redirect("/admin/press");
  });
});

router.get("/delete-press/:id", verifyAdmin, (req, res) => {
  let pressId = req.params.id;
  adminHelpers.deletePress(pressId).then(() => {
    res.redirect("/admin/press");
  });
});

router.get("/edit-press/:id", verifyAdmin, (req, res) => {
  adminHelpers.getPressDetails(req.params.id).then((pressData) => {
    res.render("admin/edit-press", {
      pressData: pressData,
      admin: true,
    });
  });
});

router.post("/edit-press/:id", upload3.any("image"), async (req, res) => {
  let id = req.params.id;
  let oldId = await adminHelpers.getPressDetails(id);
  const file = req.files;
  let filename;
  req.body.img =
    req.files.length != 0
      ? (filename = file.map((file) => {
          return file.filename;
        }))
      : oldId.img;
  adminHelpers.updatePress(req.params.id, req.body).then(() => {
    res.redirect("/admin/press");
  });
});

//-----------------------------------------------------------------------------------------

//-----------------------------------------postpress------------------------------------------------

router.get("/post-press", verifyAdmin, (req, res) => {
  adminHelpers.getPostPressesDetails().then((postpress) => {
    res.render("admin/post-press", { admin: true, postpress });
  });
});

router.get("/add-post-press", verifyAdmin, (req, res) => {
  res.render("admin/add-post-press", { admin: true });
});

router.post("/add-post-press", upload4.any("image"), (req, res) => {
  const files = req.files;
  const file = files.map((file) => {
    return file;
  });
  const fileName = file.map((file) => {
    return file.filename;
  });
  const postpress = req.body;
  postpress.img = fileName;
  adminHelpers.addPostPress(req.body).then((response) => {
    res.redirect("/admin/post-press");
  });
});

router.get("/delete-postpress/:id", verifyAdmin, (req, res) => {
  let postpressId = req.params.id;
  adminHelpers.deletePostPress(postpressId).then(() => {
    res.redirect("/admin/post-press");
  });
});

router.get("/edit-postpress/:id", verifyAdmin, (req, res) => {
  adminHelpers.getPostPressDetails(req.params.id).then((postpressData) => {
    res.render("admin/edit-post-press", {
      postpressData: postpressData,
      admin: true,
    });
  });
});

router.post("/edit-postpress/:id", upload4.any("image"), async (req, res) => {
  let id = req.params.id;
  let oldId = await adminHelpers.getPostPressDetails(id);
  const file = req.files;
  let filename;
  req.body.img =
    req.files.length != 0
      ? (filename = file.map((file) => {
          return file.filename;
        }))
      : oldId.img;
  adminHelpers.updatePostPress(req.params.id, req.body).then(() => {
    res.redirect("/admin/post-press");
  });
});

//-------------------------------------------------------------------------------


module.exports = router;

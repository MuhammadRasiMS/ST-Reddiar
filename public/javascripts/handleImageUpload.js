const convertSingleImgToWebP = (width, height, file) => {
  const outputFolder = path.join(
    __dirname,
    "./public/images/uploaded_images/"
  );

  const compressionOptions = {
    quality: 100, // Adjust  compression quality (0 - 100)
  };

  const filePath = file.path; // Path uploaded image file
  const outputFilePath =
    outputFolder + path.parse(file.filename).name + ".webp"; // Output file path  WebP image

  return new Promise((resolve, reject) => {
    sharp(filePath)
      .resize(width, height)
      .webp(compressionOptions)
      .toFile(outputFilePath)
      .then(() => {
        resolve({
          originalImagePath: filePath,
          compressedImagePath: outputFilePath,
        });
      })
      .catch((err) => {
        console.log(err);
        reject({
          originalImagePath: filePath,
          compressedImagePath: null,
          error: err.message,
        });
      });
  });
};

module.exports = {
  handleImageUpload: (req, res) => {
    // console.log('----------------------------------------------------------------')
    const inputfile = req.file;
    const imageId = req.params.id;
    if (!inputfile) {
      res.send("please choose a image");
      return;
    } else if (!inputfile.mimetype.startsWith("image/")) {
      throw new Error("Invalid single file type");
    }

    convertSingleImgToWebP(inputfile).then((results) => {
      console.log(results);
      saveSingleImageToDb(inputfile, imageId).then((results) => {
        res.redirect("/admin");
      });
    });
  },
};

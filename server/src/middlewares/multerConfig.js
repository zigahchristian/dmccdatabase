const multer = require("multer");
const storage = multer.memoryStorage();

const uploads = multer({
  storage: storage,
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith("image/");
    if (isPhoto) {
      next(null, true);
    } else {
      next("Image Files Only", false);
    }
  },
});

module.exports = uploads;

const multer = require("multer");
const storage = multer.memoryStorage();
import path from "path";
const csvpath = path.join(__dirname, "csvdata");

const csvuploads = multer({
  storage: storage,
  fileFilter(req, file, next) {
    const isCSV = file.mimetype.startsWith("text/csv");
    if (isCSV) {
      next(null, true);
    } else {
      next("CSV Files Only", false);
    }
  },
});

export default csvuploads;

const multer = require("multer");

const storage = multer.memoryStorage();

// storing the received formdata images in our memory
const multipleUpload = multer({ storage }).array("photos", 12);

module.exports = multipleUpload;

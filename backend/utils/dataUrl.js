const DatauriParser = require("datauri/parser");
const path = require("path");

// parsing the file to data uri
const getDataUri = (file) => {
  const parser = new DatauriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

module.exports = getDataUri;

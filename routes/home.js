const express = require("express");
const router = express.Router();
const { upload } = require("../utils/fileHandler");

const {
  handleFreeDownloadGet,
  handleFreeDownloadPost,
  handleFileShare,
  handleEncryptedDownloadGet,
  handleEncryptedDownloadPost,
} = require("../controllers/fileHandler");

router.get("/", (request, response) => {
  response.render("home");
});

router.post("/share", upload.single("file"), handleFileShare);

router
  .route("/open_file/:id")
  .get(handleFreeDownloadGet)
  .post(handleFreeDownloadPost);

router
  .route("/protected_file/:id")
  .get(handleEncryptedDownloadGet)
  .post(handleEncryptedDownloadPost);

module.exports = { homeRoutes: router };
const File = require("../models/File");
const bcrypt = require("bcrypt");

const handleFileShare = async (request, response) => {
  const fileData = {
    path: request.file.path,
    originalName: request.file.originalname,
    fileSize: request.file.size,
  };
  if (request.file.size > 20000000) {
    response.render("error", {errorMessage: "exceeded file size limit"})
    return
  }
  if (request.body.password != null && request.body.password !== "") {
    fileData.password = await bcrypt.hash(request.body.password, 10);
  }
  const file = await File.create(fileData);
  if (request.body.password == null || request.body.password == "") {
    response.render("home", {
      fileLink: `${request.headers.origin}/open_file/${file.id}`,
    });
  } else {
    response.render("home", {
      fileLink: `${request.headers.origin}/protected_file/${file.id}`,
    });
  }
};

const handleFreeDownloadGet = async (request, response) => {
  try {
    const file = await File.findById(request.params.id);
    const length = 35;
    var smallerString = file.originalName.substring(0, length);
    if (file.originalName.length > 35) {
      smallerString = smallerString + "....";
    }
    response.render("freeDownload", {
      originalName: smallerString,
      downloadCount: file.downloadCount,
      fileSize: ((file.fileSize) / 1000 + " KB")
    });
  } catch (error) {
    response.render("error", { errorMessage: error });
  }
};

const handleFreeDownloadPost = async (request, response) => {
  try {
    const file = await File.findById(request.params.id);
    if (file.downloadCount > 9) {
      response.render("error", {errorMessage: "The required file has expired"})
      return
    }
    file.downloadCount++;
    file.save();
    response.download(file.path, file.originalName);
  } catch (error) {
    response.render("error", { errorMessage: error });
  }
};

const handleEncryptedDownloadGet = async (request, response) => {
  try {
    const file = await File.findById(request.params.id);
    const length = 35;
    var smallerString = file.originalName.substring(0, length);
    if (file.originalName.length > 35) {
      smallerString = smallerString + "....";
    }
    response.render("encryptedDownload", {
      originalName: smallerString,
      downloadCount: file.downloadCount,
      fileSize: ((file.fileSize) / 1000 + " KB")
    });
  } catch (error) {
    response.render("error", { errorMessage: error });
  }
};

const handleEncryptedDownloadPost = async (request, response) => {
  try {
    const file = await File.findById(request.params.id);
    const length = 35;
    var smallerString = file.originalName.substring(0, length);
    if (file.originalName.length > 35) {
      smallerString = smallerString + "....";
    }
    if (!(await bcrypt.compare(request.body.password, file.password))) {
      response.render("encryptedDownload", {
        originalName: smallerString,
        downloadCount: file.downloadCount,
        fileSize: ((file.fileSize) / 1000 + " KB"),
        addedClass: "incorrect-password",
        errorMessage: "InvalidPassword",
      });
    } else {
      if (file.downloadCount > 9) {
        response.render("error", {errorMessage: "The required file has expired"})
        return
      }
      file.downloadCount++;
      file.save();
      response.download(file.path, file.originalName);
    }
  } catch (error) {
    response.render("error", { errorMessage: error });
  }
};

module.exports = {
  handleFileShare,
  handleFreeDownloadGet,
  handleFreeDownloadPost,
  handleEncryptedDownloadGet,
  handleEncryptedDownloadPost,
};

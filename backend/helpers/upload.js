const multer = require("multer");
const fs = require("fs");
const upload = (folderName = "./public/uploads/images") => {
   const FILE_TYPE_MAP = new Map([
      ["image/png", "png"],
      ["image/jpeg", "jpeg"],
      ["image/jpg", "jpg"],
      ["image/webp", "webp"],
      ["image/svg+xml", "svg"],
   ]);

   const storage = multer.diskStorage({
      destination: function (req, file, cb) {
         console.log("file in multer", file);
         const isValid = FILE_TYPE_MAP.has(file.mimetype);
         let uploadError = new Error("invalid image type");
         if (isValid) {
            uploadError = null;
         }
         const filePath = folderName + "/" + file.fieldname;
         if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true });
         }

         cb(uploadError, filePath);
      },
      filename: function (req, file, cb) {
         const fileName = file.originalname.split(" ").join("-");
         const extension = FILE_TYPE_MAP.get(file.mimetype);
         cb(null, `${fileName}-${Date.now()}.${extension}`);
      },
   });

   return multer({ storage });
};

module.exports = upload;

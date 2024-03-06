import multer from "multer";

const storage = multer.memoryStorage();
export const sheetUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.mimetype === "text/csv"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .xlsx and .csv formats are allowed!"));
    }
  },
  limits: { fileSize: 1024 * 1024 * 5 },
}).single("file");

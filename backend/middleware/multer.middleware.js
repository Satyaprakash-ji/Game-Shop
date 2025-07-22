import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const upload = multer({
    storage,
})

// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/temp'); // Temporary local storage
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname)); // e.g., 17176832312.jpg
//   }
// });

// export const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png/;
//     const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     if (isValid) cb(null, true);
//     else cb(new Error("Only images are allowed (jpeg, jpg, png)"));
//   },
// });
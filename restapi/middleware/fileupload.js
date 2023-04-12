const  multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now()+".jpg")
    }
  })

const maxSize = 1 * 1000 * 5000;
const uploadFile1 = multer({ 
      storage: storage,
      limits: { fileSize: maxSize },
      fileFilter: function (req, file, cb){
      
          // Set the filetypes, it is optional
          var filetypes = /jpeg|jpg|png/;
          var mimetype = filetypes.test(file.mimetype);
    
          var extname = filetypes.test(path.extname(
                      file.originalname).toLowerCase());
          
          if (mimetype && extname) {
              return cb(null, true);
          }
        
          cb("Error: File upload only supports the "
                  + "following filetypes - " + filetypes);
        } 
  
});  
const uploadFile = multer({  storage: storage})
module.exports = uploadFile


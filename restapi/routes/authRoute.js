const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router();
const {signup, signin, loggedinUser} = require('../controllers/authController.js');
const uploadFile = require('./../middleware/fileupload')
const verifyToken = require('../middleware/authJwt.js')
router.post('/register', uploadFile.single("pic"), signup)

router.post('/signin',signin)

router.get('/verifytoken', verifyToken, loggedinUser)

// router.get('/verifytoken', verifyToken,function (req, res) {
//     res.status(200).send({ message:"Valid Token",data:req.decodeddata });
// })

module.exports = router;
const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const {getusers,getuser,updateuser,removeuser,insertmany} = require('./../controllers/userController')
const uploadFile = require('./../middleware/fileupload')
router.get('/', getusers)
router.get('/:id', getuser)
router.post('/', function (req, res) {

})
router.put('/:id',uploadFile.single("pic"),updateuser )
router.delete('/:id', removeuser)



module.exports = router;
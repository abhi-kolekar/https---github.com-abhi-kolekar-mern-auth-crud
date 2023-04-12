const JWT       =   require('jsonwebtoken');
const bcrypt    =   require('bcrypt');
const db = require('./../models/index')
const User = require('./../models/userModel')

const upload = require('./../middleware/fileupload')

const hashPassword = async (password) => {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      console.log(error);
    }
};


exports.getusers=async(req,res)=>{   
    try{
        const user = await User.find();
        res.status(200).json({
                message:"User Found",
                user:user
            })
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}
exports.getuser=async(req,res)=>{   
  
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json({
                message:"User Found",
                user:user
            })
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

exports.updateuser=async(req,res)=>{   
        const _id =req.params.id
        const {name, email, password,address, mobile} = req.body;
        if(!_id) {
            return res.send({ error: "Id is required" });
        }
        if(!name) {
            return res.send({ error: "Name is Required" });
        }
        if(!email) {
            return res.send({ message: "Email is Required" });
        }
        if(!address) {
            return res.send({ message: "Address is Required" });
        }
        if(!mobile) {
            return res.send({ message: "Mobile is Required" });
        }
        const hashedPassword =  await hashPassword(password);
        console.log(_id)
    try{
        
        if(req.file){
            const updatedata={ name, email,address,mobile,photo:req.file.path};
            const user = await User.findByIdAndUpdate(_id, updatedata)
            res.status(201).send({message: user})
        }else{
            const updatedata={ name, email,address,mobile};
            const user = await User.findByIdAndUpdate(_id, updatedata)
            res.status(201).send({message: user})
        }
        
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

exports.removeuser=async(req,res)=>{
    try{
        const _id =req.params.id
        
        const user =User.findOneAndDelete({_id}).then(resp=>{
             res.status(201).send({message: "user removed"})
        })
        
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}




exports.loggedinUser=async(req,res)=>{
    try{
        let id = req.userId;
        //const user = await User.findOne({ where:{username: username},});
      
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({message: "User Not Found",});
        }
        res.status(200).json({
                message:"User Found",
                user:{email: user.email,_id: user._id}
            })
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}
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

const comparePassword = async(password, hashedPassword)=>{
    return bcrypt.compare(password, hashedPassword);
}


exports.signup = async(req,res,next)=>{
         console.log(req.file)
   
        const {name, email, password,address, mobile} = req.body;
        const path = req.file.path
        //validations
        if(!name) {
            return res.send({ error: "Name is Required" });
        }
        if(!email) {
            return res.send({ message: "Email is Required" });
        }
        if(!password) {
            return res.send({ message: "Password is Required" });
        }
        if(!address) {
            return res.send({ message: "Address is Required" });
        }
        if(!mobile) {
            return res.send({ message: "Mobile is Required" });
        }
        
        if(!path) {
            return res.send({ message: "Photo is Required" });
        }
        const hashedPassword =  await hashPassword(password);
    try {
        
        
        const user = new User({
            name,
            email,
            password:hashedPassword,
            address,
            mobile,
            photo:path,
        })
        await user.save().then(response => {
            res.status(201).send({message: response})
        }).catch(err=>{
            res.status(500).send({ message: err.message });
        });
        
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.signin = async(req,res)=>{
    try{
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        await User.findOne({ email: email})
        .then(user=>{
            if(!user){
                return res.status(404).send({message:"User Not Found"});
            }
            const token= JWT.sign({ email: user.email,_id: user._id }, process.env.JWT_SECRET,{
                expiresIn: 86400
            });
            
            res.status(200).send({  
                    message: "login successfully",
                    token: token,
                    user:{email: user.email,_id: user._id}
                });
        }).catch(err=>{
            if (err){
                throw err;
            } 
        })
    
    }catch(error){
        res.status(500).send({ message: error.message });
    }

};


exports.tokenverify=async(req,res)=>{
    try{
        const token = req.body.token;
        // If the token is present
        if(token){
                // Verify the token using jwt.verify method
            const decode = jwt.verify(
                token,
                process.env.JWT_SECRET
            );
            res.json({ message: decode});
        }else{
            res.status(403).json({ message: "no token"});
        }
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
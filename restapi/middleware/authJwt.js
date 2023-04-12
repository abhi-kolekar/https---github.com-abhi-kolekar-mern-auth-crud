const JWT       =   require('jsonwebtoken');
const bcrypt    =   require('bcrypt');


const verifyToken = (req, res, next)=>{
    //console.log(req.headers)
    try{
        // Get token value to the json body
        //let token = req.headers["x-access-token"];
        //let token = req.headers["authorization"];
        const token = req.headers.authorization.split(" ")[1];
  
        if (!token) {
            res.status(403).json({ message: "no token"});
        }
        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
              return res.status(401).send({message: "Unauthorized!"});
            }

            req.userId = decoded._id;
            next();
        });

    }catch(error){
            res.status(500).send({ message: error.message });
    }
}

module.exports = verifyToken;
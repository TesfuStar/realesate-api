import jwt  from "jsonwebtoken"

export const verifyToken = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token =authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_KEY, (err, user) => {
        if (err) return res.status(403).json("Token is not valid!");
          req.user = user;
          next();
      });
    } else {
      return res.status(401).json("You are not authenticated!");
    }
};

export const verifyTokenAndAuthorization=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user._id === req.params.id || req.user.isAdmin || req.user.hasCompany)  {
             next();
        }
        else{
            return res.status(401).json("you are not authorized")
        }
    })
}


//ABOUT COMPANY
export const verifyTokenAndCompanyAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.hasCompany )  {
             next()
          }
        else{
             res.status(403).json("you have no company yet!")
            }
    })
}

//ABOUT ADMIN

export const verifyTokenAndAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if( req.user.isAdmin)  {
             next()
          }
        else{
             res.status(403).json("you are not admin")
            }
    })
}


const user=require('../models/User');

const jwt=require('jsonwebtoken');

const UnauthenticatedError=require('../errors/unauthenticated');

const auth=(req,res,next)=>{
    const authHeader=req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Authentication Invalid');
    }
    const token=authHeader.split(' ')[1]
    try{
        const payload=jwt.verify(token,process.env.JWT_SECRET)
       req.user={userID:payload.userID,name:payload.name}
       next()



    }catch(err){
        throw new UnauthenticatedError('unauthenticated')

    }

}

module.exports=auth
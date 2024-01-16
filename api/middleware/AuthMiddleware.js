const jsonWebToken=require('jsonwebtoken');

function verifyToken (req,res,next){
    const authorizedHeader=req.headers.authorization;
    if(!authorizedHeader){
        return res.status(401).json({error:'no token provided!'})
    }
    if(!authorizedHeader.startsWith('Bearer ')){
        return res.status(401).json({error:'invalid token format'})

    }
    const token =authorizedHeader.slice(7);

    if(!token){
        return res.status(401).json({error:'invalid token!'})
    }

    try{
        const decodedData=jsonWebToken.verify(token,process.env.SECRET_KEY);
        console.log(decodedData);
        next();
    }catch(error){
        return res.status(401).json({error:'invalid token!'})

    }
}
module.exports=verifyToken;
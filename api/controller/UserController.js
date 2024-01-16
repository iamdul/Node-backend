const UserSchema=require('../model/UserSchema');
const bcrypt=require('bcrypt');
const jwebtoken=require('jsonwebtoken');

const signup=async (req,res)=>{
    UserSchema.findOne({username:req.body.username}).then(result=>{
        if(result==null){
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                if(err){
                    return res.status(500).json({message:'something went wrong!'})
                }
                const user=new UserSchema({
                    username:req.body.username,
                    fullName:req.body.fullName,
                    password:hash
                });
                user.save().then(saveData=>{
                    res.status(201).json({message:'user was saved'})
                }).catch(err=>{
                    res.status(500).json(error);             
                })
            });

        }else{
            res.status(409).json({message:'email already exists!'});
        }
    }).catch(error=>{
        res.status(500).json(error);
    })
}

const login=async (req,res)=>{
    UserSchema.findOne({username:req.body.username}).then(selectedUser=>{
        if(selectedUser==null){
            res.status(404).json({message:'username not found'});
        }else{
            bcrypt.compare(req.body.password, selectedUser.password, function(err, result) {
                if(err){
                    return res.status(500).json(err);
                }
                if(result){
                    const expiresIn=3600;
                    const token= jwebtoken.sign({'username':selectedUser.username},
                    process.env.SECRET_KEY,{expiresIn});
                    res.setHeader('Authorization',`Bearer ${token}`)
                    return res.status(201).json({menubar:'Check header'})
                }else{
                    return res.status(401).json({message:'password is incorrect!'})
                }
            });
            
        }
    }).catch(error=>{
        res.status(500).json(error);
    })
    
}

module.exports={
    signup,
    login
}
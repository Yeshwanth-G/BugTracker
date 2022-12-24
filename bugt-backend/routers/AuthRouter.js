const express=require('express');
const {PrismaClient}=require('@prisma/client')
const router=express.Router();
const prisma=new PrismaClient();
router.put('/login',async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user_id=await prisma.users.findMany({
            where:{
                email,
                password, 
            }, 
            select:{
                userid:true,
                name:true,
            }
        })
    if(user_id.length==0){
        res.status(400).json({
            messege:"Invalid Credentials"
        } 
        )
    }else res.status(200).json({
        id:user_id[0].userid,
        name:user_id[0].name,
        messege:`Logged in successfully`
    })
}catch(err){
    res.status(400).json({
        messege:`Server Error ${err}`
    })
}
})
router.post('/signup',async(req,res)=>{
    const {email,password,name}=req.body;
    try{    
        await prisma.users.create({
            data:{ 
                email,
                password,
                name,
            }
        })
        res.status(200).json({
            messege:'User Created Succesfully',
        })
    }catch(err){
        res.status(400).json({
            messege:`Failed to signup ${err}`,
        })
    }
    
}) 

router.get('/user_name/:userid', async (req,res)=>{
    const userid=parseInt(req.params.userid);
    try{
    const name=await prisma.users.findMany({
        where:{
            userid
        },
        select:{
            name:true
        }
    })
    res.status(200).json({
        name:name[0].name,
    })}
    catch(err){
        res.status(400).json({
            messege:err
        })
    }
})
module.exports={ AuthRouter:router};
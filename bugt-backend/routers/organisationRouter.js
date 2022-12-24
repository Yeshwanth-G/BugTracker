const router = require('express').Router();
const { PrismaClient } = new require('@prisma/client')
const prisma = new PrismaClient;
router.get('/:id', async (req, res) => {
    try{
    const userid = parseInt(req.params.id);
    const allorgs = await prisma.users.findMany({
        where: {
            userid,
        }, 
        include: {
            memberorgs: true,
            myorgs: true,
        }
    }) 
    res.status(200).json({
         allorgs:allorgs[0].memberorgs,
    })
}catch(err){
    res.status(400).json({
        messege:`Server Error ${err}`
    })
}
})
router.post('/create/:id', async (req, res) => {
    const userid = parseInt(req.params.id);
    const orgname = req.body.orgname;
    try {
        const temp = await prisma.users.update({
            where: {
                userid,
            },
            data: {
                myorgs: {
                    create: [
                        { orgname }
                    ]
                },
            },
            select: {
                myorgs: {
                    where: {
                        orgname,
                        adminid:userid,
                    },
                    select: {
                        orgid:true,
                    },
                },
            }
        })
        const p=await prisma.users.update({
            where:{
                userid,
            },
            data:{
                memberorgs:{
                    connect:{
                            orgid:temp.myorgs[0].orgid,
                        }
                }
            }
        })
        res.status(200).json({
            messege:"Added Member Successfully"
        })
    } catch (err) {
        res.status(400).json({
            messege: `system error ${err}`,
        })
    }
})


router.put('/members/remove/:id',async (req,res)=>{
    const orgid=parseInt(req.params.id);
    const userid=parseInt(req.body.userid);
    try{
        const p=await prisma.users.update({
            where:{
                userid,
            },
            data:{
                memberorgs:{
                    disconnect:{
                            orgid,
                        }
                }
            }
        })
        res.status(200).json({
            messege:"deleted member Successfully"
        })
    } catch (err) {
        res.status(400).json({
            messege: `system error ${err}`,
        })
    }

})
router.get('/members/:id',async (req,res)=>{
    const orgid=parseInt(req.params.id);
    try{
    const temp=await prisma.organisations.findMany({
        where:{
            orgid,
        },
        include:{
            members:true,
        }
    })
    res.status(200).json({
        data:temp[0].members
    })
}catch(err){
    res.status(400).json({
        data:err
    })
}
})

router.put('/members/:id',async (req,res)=>{
    const orgid=parseInt(req.params.id);
    const email=req.body.email;
    try{
    const temp1=await prisma.users.findMany({
        where:{
            email,
        }
    })
    if(temp1.length==0){
        throw "User Not Found"
    }
    const userid=temp1[0].userid
    console.log(temp1);
    await prisma.users.update({
        where:{
            userid
        },
        data:{
            memberorgs:{
                connect:{
                    orgid:orgid
                }
            }
        }
    })
    res.status(200).json({
        messege:'Added Successfully'
    })
}
    catch(err){
        res.status(400).json({
            messege:err
        })}
})
module.exports = { orgRouter: router }
const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;
router.get('/all/:id', async (req, res) => {
    const orgid = parseInt(req.params.id);
    try{
        const bugsarray = await prisma.organisations.findMany({
            where: {
                orgid,
            },
            include: {
                bugs:{
                   include:{
                        assigned:true
                    }
                }
            }
        })
        res.status(200).json({
        bugsarray:bugsarray[0].bugs
    })
}
    catch(err){
        res.status(400).json({
            messege:err
        })
    }
})


router.post('/create/:id/:orgid', async (req, res) => {
    const userid = parseInt(req.params.id);
    const orgid = parseInt(req.params.orgid);
    const bugtitle = req.body.bugtitle;
    const bugdesc = req.body.bugdesc;
    try {
        const temp = await prisma.bugs.create({
            data: {

                bugtitle,
                raisedbyid: userid,
                bugdesc,
                orgid
            },
        },
        )
        res.status(200).json({
            messege: "Bug Raised Sucessfully"
        });
    } catch (err) {
        res.status(400).json({
            messege: err,
        })
    }
})

router.get('/raised/:id/:orgid', async (req, res) => {
    const userid = parseInt(req.params.id);
    const orgid = parseInt(req.params.orgid);
    try {
        const bugsarray = await prisma.users.findMany({
            where: {
                userid,
            },
            include: {
                createdbugs: {
                    where: {
                        orgid
                    }
                },
            }
        })
        res.status(200).json({
            bugsarray,
        })
    } catch (err) {
        res.status(400).json({
            messege: err
        })
    }
})

router.get('/assigned/:id/:orgid', async (req, res) => {
    const userid = parseInt(req.params.id);
    const orgid = parseInt(req.params.orgid);
    try {
        const bugsarray = await prisma.users.findMany({
            where: {
                userid,
            },
            include: {
                assignedbugs: {
                    where: {
                        orgid
                    }
                },
            }
        })
        res.status(200).json({
            bugsarray,
        })
    } catch (err) {
        res.status(400).json({
            messege: err
        })
    }
})

router.get('/assigned_users/:bugid',async (req,res)=>{
const bugid=parseInt(req.params.bugid);
try{
    const temp=await prisma.bugs.findMany({
        where:{
            bugid,
        
        },
        select:{
            assigned:true,
        }
    }) 
    res.status(200).json({
        messege:temp[0].assigned
    })
}catch(err){
res.status(400).json({
    messege:err
})
}
})

router.post('/assign/:id/:bugid',async (req,res)=>{
    const userid = parseInt(req.params.id);
    const bugid = parseInt(req.params.bugid);
    try{
        await prisma.users.update({
            where:{
                userid,
            },
            data:{
                assignedbugs:{
                    connect:{
                        bugid
                    }
                }
            }
        })
        res.status(200).json({
            messege:"Assigned Successfully"
        })
    }catch(err){
        res.status(400).json({
            messege:err
        })
    }
})
// --------------
router.get('/pending/:orgid', async (req, res) => {
    const orgid = parseInt(req.params.orgid);
    try {
        const bugsarray = await prisma.organisations.findMany({
            where: {
                orgid,
            },
            include: {
                bugs: {
                    where: {
                        status: 'ASSIGNED'
                    }
                },
            }
        })
        res.status(200).json({
            bugsarray,
        })
    } catch (err) {
        res.status(400).json({
            messege: err
        })
    }
})


router.get('/newbugs/:orgid', async (req, res) => {
    const orgid = parseInt(req.params.orgid);
    try {
        const bugsarray = await prisma.organisations.findMany({
            where: {
                orgid,
            },
            include: {
                bugs: {
                    where: {
                        status: 'NEWBUG'
                    }
                },
            }
        })
        res.status(200).json({
            bugsarray,
        })
    } catch (err) {
        res.status(400).json({
            messege: err
        })
    }
})

router.put('/updatestatus/:bugid/:orgid', async (req, res) => {
    const orgid = parseInt(req.params.orgid);
    const bugid = parseInt(req.params.bugid);
    const bugstatus = req.body.bugstatus;
    try {
        const temp = await prisma.bugs.update({
            where: {
                bugid,
            },
            data: {
                status:bugstatus,
                updatedate:new Date(),
            },
        })
        res.status(200).json({
            messege: "Bug Status Updated Sucessfully"
        });
    } catch (err) {
        res.status(400).json({
            messege: err,
        })
    }
})



//---conv
router.post('/conv/:bugid/:userid',async (req,res)=>{
    const bugid=parseInt(req.params.bugid);
    const userid=parseInt(req.params.userid);
    const messege=req.body.messege;
    try{
        await prisma.Conversations.create({
            data:{
                bugid,
                userid,
                messege
            }
        })
        res.status(200).json({
            messege:`Conversation added`
        })
    }catch(err){
        res.status(400).json({
            messege:err,
        })
    }
})

router.get('/conv/:bugid',async (req,res)=>{
    const bugid=parseInt(req.params.bugid);
    try{
        const temp=await prisma.Bugs.findMany({
            where:{
                bugid
            },
            include:{
                conversations:true
            }
        })
        res.status(200).json({
            messege:temp[0].conversations
        })
    }catch(err){
        res.status(400).json({
            messege:err
        })
    }
})

//--requests

router.get('/requests/:orgid',async (req,res)=>{
    const orgid=parseInt(req.params.orgid);
    try{
    let temp=await prisma.Requests.findMany({
        where:{
            orgid,
        },
        include:{
            bug:true,
            user:true
        }

    })
    res.status(200).json({
        messege:temp
    })
}catch(err){
    res.status(400).json({
        messege:err
    })
}
})

router.get('/requestedusers/:bugid',async (req,res)=>{
    const bugid=parseInt(req.params.bugid);
    try{
    let temp=await prisma.Requests.findMany({
        where:{
            bugid,
        },
        include:{
            user:true
        }
    })
    res.status(200).json({
        messege:temp
    })
}catch(err){
    res.status(400).json({
        messege:err
    })
}
})

router.post('/requests/:orgid/:bugid/:userid',async (req,res)=>{
    const orgid=parseInt(req.params.orgid);
    const bugid=parseInt(req.params.bugid);
    const userid=parseInt(req.params.userid);
    try{
        const temp=await prisma.Requests.create({
            data:{
                orgid,
                bugid,
                userid,
            }
        })
        res.status(200).json({
            messege:'Request Sent'
        })
    }catch(err){
        res.status(400).json({
            messege:err
        })
    }
})

router.post('/delete_req/:orgid/:bugid/:userid',async (req,res)=>{
    const orgid=parseInt(req.params.orgid);
    const bugid=parseInt(req.params.bugid);
    const userid=parseInt(req.params.userid);
    try{
        const temp=await prisma.Requests.deleteMany({
            where:{
                orgid,
                bugid,
                userid,
            }
        })
        res.status(200).json({
            messege:'Request Deleted'
        })
    }catch(err){
        res.status(400).json({
            messege:err
        })
    }
})

module.exports = { bugRouter: router }
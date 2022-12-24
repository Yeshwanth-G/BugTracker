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
                bugs: true,
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

//-------
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

module.exports = { bugRouter: router }
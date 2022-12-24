const express=require('express');
const cors=require("cors")
const app=express(); 
app.use(cors());
app.use(express.json())
const {AuthRouter}=require('./routers/AuthRouter')
const {orgRouter}=require('./routers/organisationRouter') 
const {bugRouter}=require('./routers/bugRouter')
app.use('/auth',AuthRouter);
app.use('/orgs',orgRouter);
app.use('/bugs',bugRouter);
app.listen(8000);
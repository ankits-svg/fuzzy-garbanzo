const express=require('express')
const app=express()
const port=4100;
app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).send({"msg":"Getting the details"})
})

app.post("/add",(req,res)=>{
    res.status(200).send({"msg":"Adding to the database"})
})

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})
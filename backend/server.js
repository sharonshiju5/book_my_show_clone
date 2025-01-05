const express=require('express');
const connection=require("./connection.js")
const router=require("./router.js")
const app=express();
app.use(express.static("../frontent"))

app.use('/api',router)
connection().then(()=>{
    app.listen(3000,()=>{
        console.log(`Server started at http://localhost:3000`)
    })
}).catch((error)=>{  
    console.log(error)
})



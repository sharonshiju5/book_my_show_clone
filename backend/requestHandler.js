const { fileURLToPath } = require("url");

const userSchema=require("./multer.model.js");
const path=require('path');
const fs=require('fs')
async function addUser(req,res) {
    try {
        console.log(req.body);
    console.log(req.files);
    
    const file=req.files;
    const{username,type,year}=req.body;
    const data=await userSchema.create({username,type,year,file})

    res.status(200).send({data})
    } catch (error) {
        console.log(error);
        
    }
}
async function getUsers(req,res) {
    try {
        const user=await userSchema.find();
        res.status(200).send(user)
    } catch (error) {
        console.log(error);
        
    }
    
}
async function getMovie(req,res) {
    try {
    const {_id}=req.params;
        const user=await userSchema.findOne({_id});
        res.status(200).send(user)
    } catch (error) {
        console.log(error);
        
    }
    
}
async function loadImage(req,res) {
    const {filename}=req.params
    return res.sendFile(path.resolve(`./uploads/${filename}`))
    
}

async function editUsers(req,res) {
    const {_id}=req.params;
    const user=await userSchema.findOne({_id})
    console.log(user);
    res.status(200).send(user);
    

    
}

async function deleteUser(req,res) {
    const {_id}=req.params
    const user=await userSchema.findOne({_id})
    console.log(user);
    if(!user){
        return res.status(500).send("User not found")
    }
    console.log(__dirname);
    const fullPath=path.join(__dirname,"uploads",user.file[0,1,2].filename)
    console.log(fullPath);
    
    await fs.unlink(fullPath,(error)=>{

    })
    await userSchema.deleteOne({_id}).then(()=>{
        res.status(200).send("User deleted")
    }).catch((error)=>{
        res.status(500).send({error})
    })
}


async function updateUser(req, res) {
    // try {
    //     const {_id}=req.params;
    //     const{username,year,type}=req.body
    //     const user=await userSchema.findByIdAndUpdate(_id,{username,year,type});
    //     res.status(200).send(user)
    // } catch (error) {
    //     console.log(error);
    // }
    try {
        console.log(req.body);
        console.log(req.files);
        const {_id}=req.params;
        const file=req.files;
        const{username,type,year}=req.body;
        const data=await userSchema.findByIdAndUpdate(_id,{username,year,type,file});
        res.status(200).send({data})
    } catch (error) {
        console.log(error);   
    }
}
module.exports = {
    addUser,
    getUsers,
    getMovie,
    editUsers,
    loadImage,
    deleteUser,
    updateUser
}
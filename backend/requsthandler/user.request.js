const { fileURLToPath } = require("url");
const bcrypt = require('bcrypt') 
const pkg = require('jsonwebtoken') ;
const userSchema= require("../moduls/user.model.js");
const path=require('path');
const fs=require('fs')
// const nodemailer = require('nodemailer') 

// const trasporter=nodemailer.createTransport({
//     host:"sandbox.smtp.mailtrap.io.gmail.com",
//     port:2525,
//     secure:false,
//     auth:{
//         user:"a4d073e5a41a7d",
//         pass:"806629f32474fe",
//     },
// })


const {sign} = pkg; 


async function adduser(req,res) {
//     console.log(req.body);
//     console.log(req.files);
    
//     const {username,email,password,cpassword,profile} =req.body
//     console.log(username,email,password,cpassword);
//     if(!(username&&email&&password&&cpassword&&profile))
//         return res.status(404).send({msg:"feilds are empty"});
//     if(password!=cpassword)
//         return res.status(404).send({msg:"password not match"});
//     const data=await userSchema.findOne({email})
//     if(data)
//         return res.status(404).send({msg:"email already exists"});
//     const hpasssword= await bcrypt.hash(password,10)
// console.log(hpasssword);
// await userSchema.create({username,email,password:hpasssword,profile}).then(()=>{
//     return res.status(201).send({msg:"succesfully created"});

// }).catch((error)=>{
//     res.status(500).send({error})
// })
try {
    console.log(req.body);
console.log(req.files);

const file=req.files;
const{username,email,password,cpassword,profile}=req.body;
const data=await userSchema.create({username,email,password,cpassword,profile})

res.status(200).send({data})
} catch (error) {
    console.log(error);
    
}
}

async function loginUser(req,res) {
    const {email,password}=req.body
    if(!(email&&password))
        return res.status(404).send({msg:"feilds are empty"});
    const user=await userSchema.findOne({email})
    if(user==null)
        return res.status(404).send({msg:"email is not valid"});
    const succes=await bcrypt.compare(password,user.password)
    console.log(succes);
    const token= await sign({userID:user._id},eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c        ,
    {expiresIn:"24h"})
    res.status(200).send({msg:"success fully loged in",token});
}


async function Home(req,res) {
   try {
    console.log("end point");
    
    console.log(req.user);
    const _id=req.user.userID;
    const user=await userSchema.findOne({_id})
    res.status(200).send({username:user.username,profile:user.profile})
   } catch (error) {
    res.status(400).send({error})
   }
    
}


async function forgetPassword(req,res) {
    console.log(req.body);
    try {
        const info=await trsporter.sendMail({
            from:"rapetex461@chosenx.com",
            to:req.body.email,
            subject:"reset password",
            text:"click the link below to reset password",
            html:`<a href="http://localhost:3000/pages/forgetPassword.html">click here</a>`
        })
        console.log("message sent",info.messageId);
        res.send({msg:`message sent:%s ${info.messageId}`})
        
    } catch (error) {
        res.status(400).send({error})
    }
    
}


async function addmovie(req,res) {
    try {
        console.log(req.body);
    console.log(req.files);
    
    const file=req.files;
    const{username,email,phone}=req.body;
    const data=await userSchema.create({username,email,phone,file})

    res.status(200).send({data})
    } catch (error) {
        console.log(error);
        
    }
}
async function getmovie(req,res) {
    try {
        const user=await userSchema.find();
        res.status(200).send(user)
    } catch (error) {
        console.log(error);
        
    }
    
}
async function loadImage(req,res) {
    const {filename}=req.params
    return res.sendFile(path.resolve(`./uploads/${filename}`))
    
}

async function editmovie(req,res) {
    const {_id}=req.params;
    const user=await userSchema.findOne({_id})
    console.log(user);
    res.status(200).send(user);
    

    
}

async function deletemovie(req,res) {
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


async function updatemovie(req, res) {
    try {
        const { _id } = req.params;
        const { username, email, phone } = req.body;
        const files = req.files;

        const updatedUser = await userSchema.findByIdAndUpdate(
            _id,
            { username, email, phone, files },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({ message: "User updated successfully", data: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send({ message: "Error updating user" });
    }
}




module.exports = {
    adduser,
    loginUser,
    Home,
    forgetPassword,
    addmovie,
    getmovie,
    editmovie,
    loadImage,
    deletemovie,
    updatemovie
}
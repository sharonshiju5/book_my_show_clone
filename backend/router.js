const {Router}=require('express');
const rh=require('./requestHandler.js');
const multer=require('multer');
const storage=multer.diskStorage({
    destination:"./uploads",
    filename:(req,file,cb)=>{
        console.log(file);
        const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1E9)
        
        cb(null,uniqueSuffix+"_"+file.originalname)
    }
})

const upload = multer({ storage })
const router=Router();
router.route('/adduser').post(upload.array('file',15),rh.addUser);
router.route('/getuser').get(rh.getUsers);
router.route('/image/:filename').get(rh.loadImage);
router.route('/delete/:_id').delete(rh.deleteUser);
router.route('/showMOvie/:_id').get(rh.getMovie);
router.route('/edituser/:_id').get(rh.getMovie);
router.route('/updatemovie/:_id').put(upload.array('file',15),rh.updateUser);



module.exports=router;
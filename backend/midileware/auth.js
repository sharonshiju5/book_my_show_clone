const pkg =require('jsonwebtoken')
const {verify}=pkg
async function Auth(req,res,next) {

    try {
        const key=req.headers.authorization
        // console.log(key);
        if(!key)
            return res.status(403).send({msg:"unautharized access"})
        const token=key.split(" ")[1]
        // console.log(token);
        const auth=await verify(token,eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c)
        // console.log(auth);
        req.user=auth
        next()
    } catch (error) {
        res.status(403).send({msg:"login time expired please login again"})
    } 
}
module.exports=Auth;
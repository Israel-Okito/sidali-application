
const mongoose = require('mongoose')
const bcrypt =require('bcryptjs')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique: true, validate(value){
        if(!validator.isEmail(value)){
        throw new Error('Email is invalid')
    }}}, //pour que notre email puisse etre unique et que l'email puisse pas s'inscrire et qu'il puisse etre au format email

    password:{type:String, required:true},

    posts : [{type: Schema.Types.ObjectId,required: false,ref:'Post'}] //c'est Pour faire la relation entre Post.js et User.js
})

//hash the password
userSchema.pre('save', async function(next){
    const user = this
    if( user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
//login
userSchema.statics.findByCredentials = async(email, password,res)=>{
    const user =await User.findOne({email})
    if(!user){
        res.status(400).send({message:'unable to login'})
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        res.status(400).send({message:'unable to login'})
        throw new Error('Unable to login')
        
    }
 
    return user
}
const User =  mongoose.model('User',userSchema)
module.exports = User
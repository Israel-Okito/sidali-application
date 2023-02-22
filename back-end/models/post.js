// const modules =require('module')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    title:{type:String, required:true},
    description:{type:String,required:true},
    imageUrl:{type:String,required:true},
    userId:{type: Schema.Types.ObjectId,required:true,ref:'User'} // c'est pour faire la relation entre post et user. on a besoin de l'Id de l'utilisateur
})

module.exports = mongoose.model('Post',postSchema)


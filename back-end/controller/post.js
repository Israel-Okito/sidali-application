const bodyParser= require('body-parser')
const Post = require('../models/post')
const mongoose = require('mongoose')
const user = require('../models/user')


const addPost = async (req,res,next)=>{

    const {title, description, imageUrl,userId} = req.body
    
    let existUser
    try{
    existUser = await user.findById(userId)
    }catch(err){return console.log(err)}
    if(!existUser){
        return console.log('no user found with this ID')
    }
    const createdPost = new Post({
                 title,
                 description,
                 imageUrl,
                 userId
             })

     try{
           const sess = await mongoose.startSession()
           sess.startTransaction()
           await createdPost.save({session:sess})
           existUser.posts.push(createdPost)
           await existUser.save({session: sess})
           await sess.commitTransaction()
     }catch(err){return console.log(err)}



//     const {title, description, imageUrl} = req.body
    
//     const createdPost = new Post({
//         title,
//         description,
//         imageUrl
//     })

//     createdPost.save().then(result =>{
//      console.log('Post created')
//  }).catch(err =>{
//      console.log(err)

//  })
   

 res.status(201).json({post: createdPost})

}

const getPosts = async (req,res,next)=>{
    let posts 
    try{
        posts = await Post.find()
    }catch(err){return console.log(err)}
    if(!posts){
        return console.log('no posts found')
    }
    res.status(200).json({posts: posts})
//     Post.find().then(posts => {
//        res.status(200).json({posts:posts})

//     }).catch(err =>{
//        console.log(err)})
// }
}

const getPostById = async (req,res,next) =>{
    let postById
    const postId = req.params.postId
    try{
        
        postById = await Post.findById(postId)
    
}catch(err){return console.log(err)}
if(!postById){
    return console.log('no postById found')
}
res.status(200).json({posts: postById})
//   const postId = req.params.postId
//   Post.findById(postId).then(post => {
//       res.status(200);json({post:post})
//   }).catch(err=>{
//       console.log(err);

//   })
}

const updatePost = async (req,res,next)=>{
   const{title,description,imageUrl} = req.body
   const postId = req.params.postId
   let updatePost
try{
    updatePost = await Post.findById(postId)
}catch(err){
    return console.log(err)
}

if(!updatePost){
    return console.log(' updated post')
}
             post.title = title
             post.description = description
             post.imageUrl = imageUrl
           
try{
     await  updatePost.save()
} catch(err){ return console.log(err)}
res.status(200).json({message:' updated post'})

//    Post.findById(postId).then(post => {
//        post.title = title
//        post.description = description
//        post.imageUrl = imageUrl
//        return post.save()

//    }).then(result => {
//        console.log('updated post')
//        res.status(200).json({message:'updated post'})

//    }).catch(err =>{console.log(err)})
}

const deletePost =   async (req,res,next)=>{
const postId = req.params.postId
let deletePost

try{
    deletePost = await Post.findByIdAndRemove(postId)

}catch(err){return console.log(err)}
if(!deletePost){
    return console.log('vous ne pouvez pas supprimer un post qui ne existe plus ')
}
res.status(200).json({message:'delete post'})
// Post.findByIdAndRemove(postId).then(post => {
 
// }).then(result => {
//     console.log('delete post')
//     res.status(200).json({message:'delete post'})

// }).catch(err =>{console.log(err)})
}




exports.addPost= addPost
exports.getPosts = getPosts
exports.getPostById = getPostById
exports.updatePost = updatePost
exports.deletePost = deletePost
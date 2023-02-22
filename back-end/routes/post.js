const express = require('express')
const postcontroller = require('../controller/post')
const protect = require("../middleware/authMiddleware")
const router = express.Router()

router.post('/add-post', protect,postcontroller.addPost)
router.get('/posts',postcontroller.getPosts)
router.get('/posts/:postId',postcontroller.getPostById )
router.put('/updated-post/:postId',postcontroller.updatePost)
router.delete('/delete-post/:postId',postcontroller.deletePost)


module.exports=router

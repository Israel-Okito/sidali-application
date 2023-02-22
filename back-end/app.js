const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user')

const app=express()

app.use(bodyParser.json()) // application/json
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use('/api/post',postRoutes)
app.use('/api/user',userRoutes)

mongoose.connect('mongodb+srv://ISRAEL:GLODYDIESHO@cluster0.pos7u.mongodb.net/?retryWrites=true&w=majority'
    ).then((result)=> {
    app.listen(5000)
}).catch((err)=>{
    console.log(err)
})





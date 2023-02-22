const jwt = require('jsonwebtoken')
const bodyParser = require("body-parser");  
const User = require("../models/user");

//Generate Token
const generateToken = (id) =>{
  return jwt.sign({id},'tokenisrael1', {
    expiresIn: '30d'
  })
}

const addUser = async (req, res, next) => {
  const { name, email,password } = req.body;

  let existingUser // pour verifier si l'email de l'utilisateur existe déjà
  try{
    existingUser = await User.findOne({email})
  }catch (error) {console.log(error)}
// la condition  si l'utilisateur ou user existe déjà
  if(existingUser){
    res.status(400).send({message:'login instead'})
    throw new Error('login instead')
  }

  const createdUser = new User({
    name,
    email,
    password,

  });
  let user;

  try {
    user = await createdUser.save();
    res.status(201).json({ user: user,id: createdUser._id, token : generateToken(createdUser._id) });
  } catch (err) {
    return console.log(err);
  }

  //     const {name , email} = req.body

  //     const createdUser = new User({
  //         name,
  //         email
  //     })

  //     createdUser.save().then(result =>{
  //      console.log('user created')
  //  }).catch(err =>{
  //      console.log(err)

  //  })
  //  res.status(201).json({user: createdUser})
}
const getUsers =  async (req,res,next )=>{

    let users 
try{
    users = await User.find().select('-password')                         

}catch(err){return console.log(err)}

// if(!users)
// return console.log('no users found ')

    res.status(200).json({users:users})
}

//user login
const login =async (req,res,next)=>{
  const { email,password } = req.body;
let user
  try{
 user = await User.findByCredentials(email, password,res)                        

  
}catch(err){return console.log(err)}
res.status(200).json({
  message:'logged in',
  email:user.email, 
  id: user._id,
  token: generateToken (user._id),
})

}


exports.addUser = addUser;
exports.getUsers = getUsers;
exports.login = login
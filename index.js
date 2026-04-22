import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import bcrypt from "bcrypt"
import { registerValidations,postUpdateValidations, loginValidations, postCreateValidations } from './validations/auth.js'
import { validationResult } from 'express-validator'
import UserModel from "./models/User.js"
import checkAuth from './utils/checkAuth.js'
import multer from 'multer'
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'
import handleValidationErrors from './utils/handleValidationErrors.js'
import cors from 'cors'


//------------------------------------------------------------------------

mongoose.connect('mongodb+srv://admin:yyjjgg333555777@cluster0.svfrq3m.mongodb.net/blog').then(()=>{
    console.log('connection done');
}).catch((e)=>{
    console.log(e)
})

//------------------------------------------------------------------------

const app = express()

const storage = multer.diskStorage({
    destination:(_, __, callback)=>{
        callback(null,'uploads')
    },
    filename:(_, file, callback)=>{
        callback(null, file.originalname)
    },
})
app.use(cors());

const upload = multer({storage})

app.use(express.json())

//------------------------------------------------------------------------

app.use('/uploads', express.static('uploads'))

app.post("/auth/login", loginValidations, handleValidationErrors, UserController.login )

app.post('/auth/register', registerValidations, handleValidationErrors, UserController.register )

app.get('/auth/auth', checkAuth, UserController.auth)

app.post('/posts' ,checkAuth, postCreateValidations, handleValidationErrors, PostController.create)

app.get('/posts', PostController.getAll)

app.get('/tags', PostController.getLastTags)

app.get('/comments', PostController.getLastCommets)

app.get('/tags/:id', PostController.getByTags)

app.get('/posts/:id', PostController.getOne)

app.get('/posts-comments/:id', PostController.getOneNoUp)

app.delete('/posts/:id', checkAuth, PostController.remove)

app.patch('/posts/:id', checkAuth, postUpdateValidations, handleValidationErrors, PostController.update)

app.post("/upload",checkAuth  ,upload.single('image'), (req,res)=>{res.json({url: `/uploads/${req.file.originalname}`})})



//------------------------------------------------------------------------

app.listen(4444, (err)=>{
    if(err){
        return console.log(err)
    }
    console.log('http://localhost:4444/')
})

//------------------------------------------------------------------------
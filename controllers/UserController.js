import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import UserModel from '../models/User.js'

export const register = async (req,res)=>{
    try{
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            email: req.body.email,
            passwordHash:hash,
            avatarUrl:req.body.avatarUrl,
            fullName: req.body.fullName
        })

        const user = await doc.save()

        const token = jwt.sign({
            _id: user._id
        }, "yyjjgg333555777",{
            expiresIn:'30d'
        })

        const {passwordHash, ...userData} = user._doc

        res.json({...userData,token})
    }
    catch(e){
        res.status(500).json({
            message : "Не удалось зарегистрироваться"
        })
    }
}

export const login = async (req,res)=>{
    try{
        const user = await UserModel.findOne({ email:req.body.email })
        if(!user){
            return res.status(404).json("Неверный логин или пароль")
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if(!isValidPass){
            return res.status(404).json("Неверный логин или пароль")
        }
        const token = jwt.sign({
            _id: user._id
        }, "yyjjgg333555777",{
            expiresIn:'30d'
        })
        const {passwordHash, ...userData} = user._doc

        res.json({...userData,token})

    }
    catch(e){
        res.status(500).json("Не удалось авторизоваться")
    }
}
export const auth = async (req,res)=>{
    try{
        const user = await UserModel.findById(req.userId)

        if(!user){
            return res.status(404).json("Пользователь не найден")
        }

        const token = jwt.sign({
            _id: user._id
        }, "yyjjgg333555777",{
            expiresIn:'30d'
        })

        const {passwordHash, ...userData} = user._doc

        res.json({...userData,token})
    }
    catch(e){
        res.status(500).json("Не удалось авторизоваться")
    }
}
import {body} from 'express-validator'


export const registerValidations = [
    body('email',"Ошибка в Email").isEmail(),
    body('password', "Ошибка в Password").isLength({min:5}),
    body('fullName',"Ошибка в FullName").isLength({min:3}),
    body('avatarUrl', "Ошибка в Avatar").optional().isURL(),
]

export const loginValidations = [
    body('email',"Ошибка в Email").isEmail(),
    body('password', "Ошибка в Password").isLength({min:5}),
]

export const postCreateValidations = [
    body('title',"Ошибка в Title").isLength({min:3}).isString(),
    body('text', "Ошибка в Text").isLength({min:10}).isString(),
    body('tags',"Ошибка в Tags(массив)").optional().isArray(),
    body('imageUrl', "Ошибка в Image").optional().isString(),
    body('comments', "Ошибка в Comments").optional().isArray(),
]

export const postUpdateValidations = [
    body('title',"Ошибка в Title").isLength({min:3}).isString(),
    body('text', "Ошибка в Text").isLength({min:10}).isString(),
    body('tags',"Ошибка в Tags(массив)").optional().isArray(),
    body('imageUrl', "Ошибка в Image").optional().isString(),
    body('comments', "Ошибка в Comments").optional().isArray(),
]
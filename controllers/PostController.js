import PostModel from '../models/Post.js'

export const getLastTags = async (req,res)=>{
    try{
        const posts = await PostModel.find().exec();

        const tags = posts.map(obj => obj.tags).flat().slice(0, 5)
        res.json(tags)

    }catch(e){
        res.status(500).json({
            message : "Не удалось найти тег"
        })
    }
}
export const getLastCommets = async (req,res)=>{
    try{
        const posts = await PostModel.find().populate('user').exec();

        const comments = posts.map(obj => obj.comments).flat().slice(0, 5)
        res.json(comments)

    }catch(e){
        res.status(500).json({
            message : "Не удалось найти коментарий"
        })
    }
}
export const getByTags = async (req,res)=>{
    try {
        const tagId = req.params.id
        
        const tags = await PostModel.find({tags:tagId}).populate('user')

        res.json(tags)


    }catch(e){
        console.log(e)
        res.status(500).json({
            message : "Не удалось найти тег"
        })
    }
}

export const getAll = async (req,res)=>{
    try{
        const posts = await PostModel.find().sort({ createdAt: -1 }).populate('user').exec()

        res.json(posts)

    }catch(e){
        res.status(500).json({
            message : "Не удалось найти статью"
        })
    }
}
export const getOne = async (req,res)=>{
    try {
        const postId = req.params.id
        
        const post = await PostModel.findOneAndUpdate(
            {
                _id:postId
            }, 
            {
                $inc:{ viewsCount:1 }
            },
            {
                returnDocument:'after'
            }

        ).populate('user')
        res.json(post)


    }catch(e){
        console.log(e)
        res.status(500).json({
            message : "Не удалось найти статью"
        })
    }
}
export const getOneNoUp = async (req,res)=>{
    try {
        const postId = req.params.id
        
        const post = await PostModel.findOne({_id:postId}).populate('user')
        
        res.json(post)


    }catch(e){
        console.log(e)
        res.status(500).json({
            message : "Не удалось найти статью"
        })
    }
}

export const remove = async (req,res)=>{
    try {
        const postId = req.params.id
        
        const post = await PostModel.findOneAndDelete(
            {
                _id:postId
            }
        )
        
        if(!post){
            res.status(500).json({
            message : "Не удалось удалить статью"
        })
        }

        res.json(post)


    }catch(e){
        console.log(e)
        res.status(500).json({
            message : "Не удалось получить статью"
        })
    }
}

export const update = async (req,res) =>{
    try{
        const postId = req.params.id

        const post = await PostModel.updateOne({_id:postId},{
            title:req.body.title,
            text:req.body.text,
            tags:req.body.tags,
            imageUrl:req.body.imageUrl,
            user: req.userId,
            comments: req.body.comments,
            
        })

        res.json(post)

    }catch(e){
        console.log(e)
        res.status(500).json("Не удалось обновить статью")
    }
}

export const create = async (req,res)=>{
    try{
        const doc = new PostModel({
            title:req.body.title,
            text:req.body.text,
            tags:req.body.tags,
            imageUrl:req.body.imageUrl,
            user: req.userId,
            comments:req.body.comments
        })
        const post = await doc.save()

        res.json(post)

    }catch(e){
        res.status(500).json({
            message : e
        })
    }
}
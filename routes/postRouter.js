const express = require("express");
const router = express.Router();
const {Post, Author, Category, Comment} = require("../models");
const { where } = require("sequelize");

router.post("/",async(req,res)=>{
    try {
        const {category_id,author_id,title,content,date} = req.body;
        if(!category_id || !author_id || !title || !content){
            res.status(400).json({error : "Enter CategroyId,AuthorID,Title and Content!"})
        }
        const post = await Post.create({category_id,author_id,title,content,date})
        res.status(201).json({
            message : "Created Post successfully",
            post
        })
    } catch (error) {
        res.status(500).json(err)
    }
})

router.get("/",async(req,res)=>{
    try {
        const query = req.query;
        let filter = {where : query}
        const post =await Post.findAll({
            ...filter,
            // where : query,
            // where : {
            //     "category_id" : 1,
            //     "author_id" : 1
            // },
            include : [Author,Category,Comment],
            order : [
                ['author_id','ASC'],
                ['createdAt','DESC']
            ]
        });
        res.status(200).json({
            total : post?.length,
            post
        })
    } catch (error) {
        res.status(500).json(err)
    }
})

router.get("/:id",async(req,res)=>{
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId);
        if(post){
            res.status(200).json({post})
        }else{
            res.status(404).json({error : "Post Not Found!"})
        }
    } catch (error) {
        res.status(500).json(err)
    }
})

router.put("/:id",async(req,res)=>{
    try {
        const postId = req.params.id;
        const {category_id,author_id,title,content,date} = req.body;
        const post = await Post.findByPk(postId);
        if(post){
            await post.update({category_id,author_id,title,content,date});
            res.status(201).json({
                message : "Updated Post Successfully",
                post
            })
        }else{
            res.status(404).json({error : "Post Not Found!"})
        }
    } catch (error) {
        res.status(500).json(err)
    }
})

router.delete("/:id",async(req,res)=>{
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId);
        if(post){
            await post.destroy();
            res.status(200).json({
                message : "Deleted Post Successfully"
            })
        }else{
            res.status(404).json({error : "Post Not Found!"})
        }
    } catch (error) {
        res.status(500).json(err)
    }
})

module.exports = router;
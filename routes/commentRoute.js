const express = require("express");
const router = express.Router();
const {Comment, Post} = require("../models")

router.post("/",async(req,res)=>{
    try {
        const {post_id,content,date} = req.body;
        if(!post_id || !content){
            res.status(400).json({error : "Enter PostId and Content!"})
        }
        const comment = await Comment.create({post_id,content,date})
        res.status(201).json({
            message : "Created Comment successfully",
            comment
        })
    } catch (error) {
        res.status(500).json(err)
    }
})

router.get("/",async(req,res)=>{
    try {
        const comment =await Comment.findAll({
            include : Post
        });
        res.status(200).json({
            total : comment?.length,
            comment
        })
    } catch (error) {
        res.status(500).json(err)
    }
})

router.get("/:id",async(req,res)=>{
    try {
        const commentId = req.params.id;
        const comment = await Comment.findByPk(commentId);
        if(comment){
            res.status(200).json({comment})
        }else{
            res.status(404).json({error : "Comment Not Found!"})
        }
    } catch (error) {
        res.status(500).json(err)
    }
})

router.put("/:id",async(req,res)=>{
    try {
        const commentId = req.params.id;
        const {post_id,content,date} = req.body;
        const comment = await Comment.findByPk(commentId);
        if(comment){
            await comment.update({post_id,content,date});
            res.status(201).json({
                message : "Updated Comment Successfully",
                comment
            })
        }else{
            res.status(404).json({error : "Comment Not Found!"})
        }
    } catch (error) {
        res.status(500).json(err)
    }
})

router.delete("/:id",async(req,res)=>{
    try {
        const commentId = req.params.id;
        const comment = await Comment.findByPk(commentId);
        if(comment){
            await comment.destroy();
            res.status(200).json({
                message : "Deleted Comment Successfully"
            })
        }else{
            res.status(404).json({error : "Comment Not Found!"})
        }
    } catch (error) {
        res.status(500).json(err)
    }
})

module.exports = router;
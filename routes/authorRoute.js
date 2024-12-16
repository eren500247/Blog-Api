const express = require("express")
const router = express.Router();
const {Author} = require("../models")


router.post("/",async(req,res)=>{
    try {
        const {name,email,address} = req.body;
        if(!name || !email){
            res.status(400).json({error : "Enter Author name and email!"})
        }
        const author = await Author.create({name,email,address})
        res.status(201).json({
            message : "Created Author successfully",
            author
        })
    } catch (err) {
        res.status(500).json(err)        
    }
})

router.get("/",async(req,res)=>{
    try {
        const author = await Author.findAll();
        res.status(200).json({
            total : author?.length,
            author
        })
    } catch (err) {
        res.status(500).json(err)        
    }
})

router.get("/:id",async(req,res)=>{
    try {
        const authorId = req.params.id;
        const author = await Author.findByPk(authorId);
        if(author){
            res.status(200).json({
                author
            })
        }else{
            res.status(404).json({error : "Author Nor Found!"})
        }
       
    } catch (err) {
        res.status(500).json(err)        
    }
})

router.put("/:id",async(req,res)=>{
    try {
        const authorId = req.params.id;
        const {name,email,address} = req.body;
        const author = await Author.findByPk(authorId);
        if(author){
            await author.update({name,email,address});
            res.status(201).json({
                message : "Updated Author Successfully",
                author
            })
        }else{
            res.status(404).json({error : "Author Nor Found!"})
        }
       
    } catch (err) {
        res.status(500).json(err)        
    }
})

router.delete("/:id",async(req,res)=>{
    try {
        const authorId = req.params.id;
        const author = await Author.findByPk(authorId);
        if(author){
            await author.destroy();
            res.status(200).json({
                message : "Deleted Author Successfully"
            })
        }else{
            res.status(404).json({error : "Author Nor Found!"})
        }
       
    } catch (err) {
        res.status(500).json(err)        
    }
})

module.exports = router;
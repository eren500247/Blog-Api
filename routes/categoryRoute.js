const express = require("express");
const router = express.Router();
const {Category} = require("../models")

router.post("/",async(req,res)=>{
    try {
        const {name,description} = req.body;
        if(!name){
            res.status(400).json({error : "Enter Author name and email!"})
        }
        const category = await Category.create({name,description})
        res.status(201).json({
            message : "Created Category successfully",
            category
        })
    } catch (error) {
        res.status(500).json(err)
    }
})

router.get("/",async(req,res)=>{
    try {
        const category =await Category.findAll();
        res.status(200).json({
            total : category?.length,
            category
        })
    } catch (error) {
        res.status(500).json(err)
    }
})

router.get("/:id",async(req,res)=>{
    try {
        const categoryId = req.params.id;
        const category = await Category.findByPk(categoryId);
        if(category){
            res.status(200).json({category})
        }else{
            res.status(404).json({error : "Category Not Found!"})
        }
    } catch (error) {
        res.status(500).json(err)
    }
})

router.put("/:id",async(req,res)=>{
    try {
        const categoryId = req.params.id;
        const {name,description} = req.body;
        const category = await Category.findByPk(categoryId);
        if(category){
            await category.update({name,description});
            res.status(201).json({
                message : "Updated Category Successfully",
                category
            })
        }else{
            res.status(404).json({error : "Category Not Found!"})
        }
    } catch (error) {
        res.status(500).json(err)
    }
})

router.delete("/:id",async(req,res)=>{
    try {
        const categoryId = req.params.id;
        const category = await Category.findByPk(categoryId);
        if(category){
            await category.destroy();
            res.status(200).json({
                message : "Deleted Category Successfully"
            })
        }else{
            res.status(404).json({error : "Category Not Found!"})
        }
    } catch (error) {
        res.status(500).json(err)
    }
})

module.exports = router;
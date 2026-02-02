import express, { Router } from "express"
import Thread from "../models/Thread.js"
import geminiAPIResponse from "../utils/gemini.js"

const router =express.Router()


//test

router.post("/test",async(req,res)=>{
    try{
        const thread=new Thread({
            threadId:"abc",
            title:"Testing New Threads"
        })
        const response=await thread.save()
        res.send(response)
    }catch(err){
        console.log(err);
        res.status(500).json({err:"failed to save in DB"})
    }
})

//get all thread

router.get("/thread",async(req,res)=>{
    try{
       const threads= await Thread.find().sort({updatedAt:-1})
       res.json(threads)

    }catch(err){
        console.log(err);
        res.status(500).json("failed to fetch threads")
        
    }
})

router.get("/thread/:threadId",async(req,res)=>{
    const{threadId}=req.params;
    try{
        const thread=await Thread.findOne({threadId})
        if(!thread){
            return res.status(404).json({error:"thread not found"})
        }

          res.status(200).json(thread);
    }catch(err){
        console.log(err);
        res.status(500).json("failed to fetch chat")
    }
})

router.delete("/thread/:threadId",async(req,res)=>{
    const{threadId}=req.params
    try{
       const deleteThread=await Thread.findOneAndDelete({threadId})
       if(!deleteThread){
        res.status(404).json({error:"thread not found"})
       }
       res.status(200).json({success:"thread deleted successfuly"})
    }catch(err){
        console.log(err);
        res.status(500).json({err:"failed to delete thread"})
    }
})

router.post("/chat",async(req,res)=>{
    const {threadId,message}=req.body;
    if(!threadId||!message){
       return  res.status(400).json({error:"missing required feilds"})
    }
    try{
        let thread=await Thread.findOne({threadId})
        if(!thread){
            thread=new Thread({
                threadId,
                title:message,
                messages:[{role:"user",content:message}]
            })
        }else{
            thread.messages.push({role:"user",content:message})
        }
        const assistantReply=await geminiAPIResponse(message);
        thread.messages.push({role:"assistant",content:assistantReply})
        thread.updatedAt=new Date()
        await thread.save()
        res.json({reply:assistantReply})
    }catch(err){
        console.log(err);
        res.status(500).json({error:"something went wrong"})
        
    }
})

export default router
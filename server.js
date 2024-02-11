const express = require('express');
const mongoose = require('mongoose');


const app = express();
const port = 3500

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/todo-list')  
.then(()=>console.log('connected to db')) 
const todoschema= new mongoose.Schema({
    name:String,
    title:String,
    completionDate:Number,
    delation:String,

})
const task=mongoose.model('task',todoschema);

app.post('/Createlist', async(req,res)=>{
    debugger
    try{
        const {name,title,completionDate,delation}=req.body
       
        const newtasks=await task.create(
            {
                 name:name,
                title:title,
                completionDate:completionDate,
                delation:delation

            })
            debugger
            res.status(201).json({
                message:"task created successfully",
                data:newtasks
            });

    }catch(error){
        debugger
          res.status(500).json({error:error.message});
    }
})

app.get('/list/:name',async (req, res) => {
    try {
         const name = req.params.name;
         const tasks = await task.find({ name: name });
             res.status(200).json({
                 message: "tasks fetched successfully",
                 data: tasks
             })
    }
    catch (error) {
        res.status(500).json({ error: "can't fetch tasks" })
    }

    
})
app.get('/list',async (req, res) => {
    try {
         const tasks = await task.find();
             res.status(200).json({
                 message: "tasks fetched successfully",
                 data: tasks
             })
       }
    catch (error) {
        res.status(500).json({ error: "can't fetch tasks" })

    }
})
   app.put('/list/:name',async (req, res) => {
    try {
        const name = req.params.name;
                 const tasks=await task.findOneAndUpdate({ name: name })

      
        if (!tasks) {
            return res.status(404).json({ message: "task not found" });
        }
             res.status(200).json({
                 message: "task updated successfully",
                 data: tasks
             });

            }
        catch (error) {
            
        }
        
        });


     
  app.delete('/list/:name',async (req, res) => {
    try {
        const name= req.params.name;
        const tasks = await task.deleteOne({ name: name });
        if(!tasks) {   
            return res.status(404).json({ message: "task not found" });
        }
        
        res.status(200).json({
            message: "task deleted successfully LPC",
            data: tasks,
          });
    }
    catch (error) {
        res.status(500).json({ error: "can't delete task" })
    }
  })  

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
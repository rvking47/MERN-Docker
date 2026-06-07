import User from "../models/user.js";

const createUser = (req, res)=>{
    try{
       const users = req.body;
       if(!Array.isArray(users)){
        return res.status(400).json({message: "Expected an array of users"});
       }
       const saveUsers = User.insertMany(users);
       res.status(201).json({message: "Users created successfully", users: saveUsers});
    }
    catch(error){
        res.status(500).json({message: "Error creating user", error});
    }
}

const getUsers = async (req, res)=>{
    try{
        const users = await User.find();
        res.status(200).json({users});
    }
    catch(error){
        res.status(500).json({message: "Error fetching users", error});
    }   
}

export {createUser, getUsers};
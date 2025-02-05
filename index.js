//Datha Binduamalm 02/04/2025
//CS490-102 Exercise 3

const express = require('express');
const app = express()

app.use(express.json());

const { randomUUID } = require('crypto');

//Placeholder element in array for testing purposes
const users = [{
    "id" : 12,
    "name" : "HIIIIIII",
    "email" : "BYEEEEE@gmail.com"
}];

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

//Create a user
app.post("/users", (req, res) => {
    if(req.body.name && req.body.email){
        const newUser = {"id": randomUUID(), name : req.body.name, email : req.body.email};
        users.push(newUser);
        res.status(201).json(newUser);
    }else{
        res.status(400).json("400 Bad Request");
    }
    
})

//Get a user by ID
app.get("/users/:id", (req, res) => {
    const user = users.find(user => user.id == req.params.id);
    user ? res.json(user) : res.status(404).json("404 Not Found");
})

//Update a user
app.put("/users/:id", (req, res) => {
    const user = users.find(user => user.id == req.params.id);
    if(user){
        if(req.body.name && req.body.email){
            user.name = req.body.name;
            user.email = req.body.email;
            res.status(201).json(user);
        }else{
            res.status(400).json("400 Bad Request");
        }
    }else{
        res.status(404).json("404 Not Found");
    } 
})

//Delete a user
app.delete("/users/:id", (req, res) => {
    const userIndex = users.findIndex(user => user.id == req.params.id);
    if(userIndex != -1){
        users.splice(userIndex, 1);
        res.status(204).json("204 No Content");
    }else{
        res.status(404).json("404 Not Found");
    }
})
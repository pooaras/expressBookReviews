const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];
let matcheduser=[];
let authusers=[];
const isValid = (username)=>{ //returns boolean
    matcheduser=users.filter((user)=>{
        return user.username===username;
    })
    if(matcheduser.length>0)
        return true;
    else
        return false;
}

const authenticatedUser = (username,password)=>{ 
    authusers=users.filter((user)=>{
        return (user.username===username && user.password===password)

    })
    if(authusers.length>0)
    {
        return true;
    }
    else{
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    let username=req.body.username;
    let password=req.body.password;
    if(authenticatedUser(username,password)){
        let accessToken=jwt.sign({
            data:password
        },'access',{expiresIn:60*60})
        req.session.authorization={accessToken,username}
        return res.status(200).send("User successfully logged in");
    } 
    else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
    
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  let isbn=req.params.isbn;
  let review=req.query.review;
    if(isbn && review){
        books[isbn].reviews[authusers[0].username]=review;
        res.send("review added successfully")
    }
    else{
        res.status(208).send("review or isbn not found")
    }
});
regd_users.delete("/auth/review/:isbn",(req,res)=>{
    let isbn=req.params.isbn;
    if(isbn && review){
        delete books[isbn].reviews[authusers[0].username];
        res.send("review deleted successfully")
    }
    else{
        res.status(208).send("isbn not found")
    }
    
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    let matcheduser=users.filter((user)=>{
        return user.username===username;
    })
    if(matcheduser.length>0)
        return true;
    else
        return false;
}

const authenticatedUser = (username,password)=>{ 
    let authusers=users.filter((user)=>{
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
  books[isbn].reviews=req.query.review;
  res.send("review added")
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

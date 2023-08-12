const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books));
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    isbn=req.params.isbn;
    if(isbn)
    res.send(books[isbn]);
    else
    return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    author=req.params.author;
    let matchedbooks=[]
    if(author){
        // let length=Object.keys(books).length;
        for(const key in books){
            if(books.hasOwnProperty(key) && books[key].author===author)
                matchedbooks.push(books[key])
        }
    if(matchedbooks)
        res.send(matchedbooks);
    else
        return res.status(300).json({message: "Yet to be implemented"});    
        
    }
    else
        return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    title=req.params.title;
    let matchedbooks=[]
    if(title){
        // let length=Object.keys(books).length;
        for(const key in books){
            if(books.hasOwnProperty(key) && books[key].title===title)
                matchedbooks.push(books[key])
        }
    if(matchedbooks)
        res.send(matchedbooks);
    else
        return res.status(300).json({message: "Yet to be implemented"});    
        
    }
    else
        return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;

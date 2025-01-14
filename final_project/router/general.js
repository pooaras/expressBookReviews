const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    let username=req.body.username;
    let password=req.body.password;
    if(!isValid(username)){
        users.push({"username":username,"password":password})
        //res.send(users)
        res.send("user registered")
    }
    else
    return res.status(300).json({message: "user already exist"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let promise= new Promise((resolve,reject)=>{
        try{
            resolve(JSON.stringify(books))
        }
        catch(err){
            reject(err)
        }
    })
    promise.then(
        (msg)=>{res.send(msg)},
        (err)=>{res.send(err)}
    )
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let promise=new Promise((resolve,reject)=>{
        try{
            isbn=req.params.isbn;
            if(isbn)
                resolve(books[isbn]);
        }
        catch(err){
            reject("book not found")
        }
    })
    promise.then(
        (data)=>{res.send(data)},
        (err)=>{res.send(err)}
        )

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    author=req.params.author;
    let matchedbooks=[]
    let promise=new Promise((resolve,reject)=>{
        try{
            if(author){
                // let length=Object.keys(books).length;
                for(const key in books){
                    if(books.hasOwnProperty(key) && books[key].author===author)
                        matchedbooks.push(books[key])
                }
            if(matchedbooks)
                resolve(matchedbooks);
            else
                reject("books not found");
            }

        }
        catch(err){
            reject("not found")
        }
    })
    promise.then(
        (data)=>{res.send(data)},
        (err)=>{res.send(err)}
    )
    
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    title=req.params.title;
    let matchedbooks=[]
    let promise=new Promise((resolve,reject)=>{
        try{
            if(title){
                for(const key in books){
                    if(books.hasOwnProperty(key) && books[key].title===title)
                        matchedbooks.push(books[key])
                }
            if(matchedbooks)
                resolve(matchedbooks);
            else
                reject("books not found");    
                
            }
        }
        catch(err){
            reject("not found")
        }
    })
        promise.then(
            (data)=>{res.send(data)},
            (err)=>{res.send(err)}
        )
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    isbn=req.params.isbn;
    if(isbn)
    return res.send(books[isbn].reviews);
    else
    return res.status(300).json({message: "not found"});
});

module.exports.general = public_users;

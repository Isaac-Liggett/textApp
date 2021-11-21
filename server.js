const express = require("express");
const mongoose = require("mongoose");
const User = require("./schemas/userSchema");
const Conversation = require("./schemas/conversationSchema");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017/TextApp", () =>
  console.log("connected to db")
);

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

app.get("/", (req, res) => {
  res.send("testing");
});

app.post("/register", (req, res) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  console.log("register called: ", req.body);
  User.create(newUser, (err) => {
    if (err) {
      console.log(err.message);
      if (err.code == 11000) {
        if (err.message.includes("username")) {
          res.json({ error: "the username is already in use" });
          console.log("the username is already in use");
        } else if (err.message.includes("email")) {
          res.json({ error: "the email is already in use" });
          console.log("the email is already in use");
        }
      }
    } else {
      console.log("user created");
      res.json({ message: "user created" });
    }
  });
});

app.post("/login", (req, res) => {
  //console.log(req.body)
  if (req.cookies.sess === undefined) {
    //user has logged in for the first time
    console.log(req.body.username);
    User.findOne({ username: req.body.username }, (err, doc) => {
      if (err) {
        //handle error
        res.json({ error: "there was an error" });
      } else {
        if (doc) {
          if (doc.password == req.body.password) {
            //successful login
            console.log(doc);
            var cookie = makeid(12);
            console.log(doc);
            User.findOneAndUpdate(
              {username: doc.username, email: doc.email},
              { keys: [...doc.keys, cookie] },
              (err) => {
                if (err) {
                  req.send(501, { error: "database error" });
                }
              }
            );
            res.cookie("sess", cookie, { maxAge: 900000, httpOnly: true });
            res.status(200).send({ pass: true });
          } else {
            res.json({ error: "incorrect password" });
          }
        } else {
          //error no user found
          res.json({ error: "no user found" });
        }
      }
    });
  } else {
    //user has cookie
    console.log("user has cookie");
    User.findOne({ keys: req.cookies.sess }, (err, doc) => {
      if (err) {
        //error
        req.status(404).send({ error: "there was an error mate" });
      } else {
        //no error
        if (doc) {
          //a user has the cookie
          res.status(200).send({ pass: true });
        } else {
          //no user has the cookie
          res.clearCookie("sess");
          res.status(201).send({ pass: false });
        }
      }
    });
  }
});

app.get("/query-cookie", (req, res)=>{
  User.findOne({keys: req.cookies.sess}, (error, doc)=>{
    if(error){
      res.status(500).send({error: "database error"});
    }else{
      if(doc){
        res.status(200).send({username: doc.username, email: doc.email});
      }else{
        res.status(201).send({error: "no user with that cookie"});
      }
    }
  })
})

app.get("/conversations", (req, res) => {
  if (req.cookies.sess !== undefined) {
    User.findOne({ keys: req.cookies.sess }, (err, doc) => {
      if (err) {
        res.status(404).send({ error: "database error" });
      } else {
        if (doc) {
          Conversation.find({ participants: doc.username }, {_id: true, name: true}, (err, doc) => {
            if (err) {
              res.status(404).send({ error: "database error" });
            } else {
              console.log(doc);
              res.status(200).send(doc);
            }
          });
        } else {
          //invalid cookie
          res.clearCookie("sess");
          res.status(201).send({ pass: false, reason: "invalid cookie" });
        }
      }
    });
  } else {
    res.status(201).send({ pass: false, reason: "no cookie" });
  }
});

app.post("/conversations/texts", (req, res) => {
  console.log("body: ", req.body);
  if (req.cookies.sess !== undefined) {
    User.findOne({ keys: req.cookies.sess }, (err, doc) => {
      if (err) {
        res.status(404).send({ error: "database error" });
      } else {
        if (doc) {
          Conversation.find({ participants: doc.username, _id: req.body.id }, {_id: true, name: true, messages: true}, (err, doc) => {
            if (err) {
              res.status(404).send({ error: "database error" });
            } else {
              console.log(doc);
              res.status(200).send(doc);
            }
          });
        } else {
          //invalid cookie
          res.clearCookie("sess");
          res.status(201).send({ pass: false, reason: "invalid cookie" });
        }
      }
    });
  } else {
    res.status(201).send({ pass: false, reason: "no cookie" });
  }
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

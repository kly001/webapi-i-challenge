// implement your API here
const express = require("express");

const db = require('./data/db.js');

const server = express();

server.listen(3000, ()=>{
    console.log("Hello. API is running on port 3000.")
})

server.get("/", (req,res)=> {
    res.send("Testing Server")
})

//--------------------------------------------------------
server.get("/api/users", (req, res) => {
    db.find()
    .then(users=> {
        res.status(200).json(users)
    })
     .catch(err => {
         res.status(500).json({success: false, err,})})
})

//--------------------------------------------------------

server.get("/api/users/:id", (req, res) => {
    db.findById(req.params.id)
      .then(user => {
        if (user) {
          res.status(200).json({
            success: true,
            user,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "The user with the specified ID does not exist.",
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: "The user information could not be retrieved.",
        });
      });
   });

   //----------------------------------------------------------


 server.delete('api/users/:id', (req, res) => {
    const { id } = req.params;
   
    db.remove(id)
      .then(deleted => {
        if (deleted) {
          res.status(204).end();
        } else {
          res.status(404).json({
            success: false,
            message: "The user with the specified ID does not exist.",
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: "The user could not be removed",
        });
      });
   });

   //--------------------------------------------------------------


   server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
   
    db.update(id, changes)
      .then(updated => {
        if (updated) {
          res.status(200).json({ success: true, updated });
        } else {
          res.status(404).json({
            success: false,
            message: "The user with the specified ID does not exist." ,
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          error: "The user information could not be modified.",
        });
      });
   });

   //-----------------------------------------------

   server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    db.add(userInfo)
      .then(user => {
          res.status(201).json({ success: true, user});
      })
      .catch(err=> {
          res.status(500).json({
              success: false,
              err,
          })
      })
})
